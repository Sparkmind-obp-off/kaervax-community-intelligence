interface Env { DB: D1Database; APP_NAME: string }

const json = (data: unknown, status = 200) => new Response(JSON.stringify(data), {
  status, headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" }
});
const uid = () => crypto.randomUUID();
const now = () => new Date().toISOString();

async function audit(env: Env, eventType: string, entityType: string, entityId: string, metadata: unknown = {}) {
  await env.DB.prepare("INSERT INTO audit_events (id,actor,event_type,entity_type,entity_id,metadata,created_at) VALUES (?,?,?,?,?,?,?)")
    .bind(uid(), "operator", eventType, entityType, entityId, JSON.stringify(metadata), now()).run();
}

const html = `<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1"><title>Kaervax Community Intelligence</title>
<style>
body{margin:0;background:#f5f7fb;color:#17202a;font:14px system-ui,sans-serif}
header{padding:22px 28px;background:#111827;color:#fff}h1{margin:0;font-size:22px}
main{max-width:1180px;margin:24px auto;padding:0 18px}.grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}
.card,.panel{background:#fff;border:1px solid #e5e7eb;border-radius:12px;padding:16px}.stat{font-size:28px;font-weight:750}.muted{color:#6b7280;font-size:13px}
.toolbar{display:flex;gap:10px;flex-wrap:wrap;margin:18px 0}button,input,select{font:inherit;padding:10px;border:1px solid #d1d5db;border-radius:8px}
button{cursor:pointer;background:#111827;color:#fff}button.secondary{background:#fff;color:#111827}
table{width:100%;border-collapse:collapse}th,td{text-align:left;padding:11px;border-bottom:1px solid #eee}.pill{padding:4px 8px;border-radius:99px;background:#eef2ff;font-size:12px}
.modal{display:none;position:fixed;inset:0;background:#0007;align-items:center;justify-content:center}.modal.open{display:flex}
.modal form{background:#fff;padding:22px;border-radius:14px;width:min(520px,90vw)}.modal input,.modal select{width:100%;box-sizing:border-box;margin:6px 0 12px}
@media(max-width:800px){.grid{grid-template-columns:repeat(2,1fr)}}
</style></head><body><header><h1>Kaervax Community Intelligence</h1><div style="color:#cbd5e1;margin-top:5px">Phase 1 — Community Radar</div></header>
<main><div class="grid" id="stats"></div>
<div class="toolbar"><input id="search" placeholder="Search communities…"><select id="platform"><option value="">All platforms</option>
<option>Threads</option><option>Facebook</option><option>Reddit</option><option>X</option><option>Telegram</option><option>Discord</option><option>Manual</option></select>
<button onclick="load()">Refresh</button><button onclick="openModal()">+ Add community</button></div>
<div class="panel"><table><thead><tr><th>Community</th><th>Platform</th><th>Category</th><th>Geography</th><th>Status</th><th>Activity</th><th>Opportunity</th></tr></thead><tbody id="rows"></tbody></table></div></main>
<div class="modal" id="modal"><form onsubmit="save(event)"><h2>Add community</h2>
<label>Name<input name="name" required></label><label>Platform<select name="platform"><option>Manual</option><option>Threads</option><option>Facebook</option><option>Reddit</option><option>X</option><option>Telegram</option><option>Discord</option></select></label>
<label>Category<input name="category" placeholder="developer, UMKM, property…"></label><label>Geography<input name="geography" placeholder="Banyumas / Indonesia"></label>
<label>URL<input name="url" type="url"></label><label>Access<select name="access_type"><option>public</option><option>member</option><option>private</option><option>unknown</option></select></label>
<div class="toolbar"><button type="submit">Save</button><button type="button" class="secondary" onclick="closeModal()">Cancel</button></div></form></div>
<script>
const $=s=>document.querySelector(s);
const esc=v=>String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
function openModal(){$('#modal').classList.add('open')} function closeModal(){$('#modal').classList.remove('open')}
async function load(){const p=$('#platform').value,q=$('#search').value;const u='/api/communities?'+new URLSearchParams({platform:p,q:q});
const d=await(await fetch(u)).json();const s=d.stats;
$('#stats').innerHTML=[['Total',s.total],['Active',s.active],['High activity',s.high_activity],['Tracked opportunities',s.opportunities]].map(x=>'<div class="card"><div class="muted">'+x[0]+'</div><div class="stat">'+x[1]+'</div></div>').join('');
$('#rows').innerHTML=d.communities.map(c=>'<tr><td><strong>'+esc(c.name)+'</strong><br><span class="muted">'+esc(c.url||'No URL')+'</span></td><td><span class="pill">'+esc(c.platform)+'</span></td><td>'+esc(c.category||'—')+'</td><td>'+esc(c.geography||'—')+'</td><td>'+esc(c.monitoring_status)+'</td><td>'+Number(c.activity_score).toFixed(0)+'</td><td>'+Number(c.opportunity_score).toFixed(0)+'</td></tr>').join('')}
async function save(e){e.preventDefault();const body=Object.fromEntries(new FormData(e.target).entries());
const r=await fetch('/api/communities',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(body)});
if(!r.ok){alert('Save failed');return}closeModal();e.target.reset();load()}
$('#platform').onchange=load;$('#search').oninput=load;load();
</script></body></html>`;

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    try {
      if (url.pathname === "/" && request.method === "GET") return new Response(html, {headers:{"content-type":"text/html; charset=utf-8"}});
      if (url.pathname === "/health") return json({ok:true,service:env.APP_NAME,time:now()});

      if (url.pathname === "/api/communities" && request.method === "GET") {
        const q=url.searchParams.get("q")||"", platform=url.searchParams.get("platform")||"";
        const rows=await env.DB.prepare("SELECT * FROM communities WHERE (?='' OR platform=?) AND (?='' OR name LIKE '%'||?||'%' OR category LIKE '%'||?||'%' OR geography LIKE '%'||?||'%') ORDER BY opportunity_score DESC,activity_score DESC,updated_at DESC")
          .bind(platform,platform,q,q,q,q).all();
        const stats=await env.DB.prepare("SELECT COUNT(*) total,SUM(CASE WHEN monitoring_status='active' THEN 1 ELSE 0 END) active,SUM(CASE WHEN activity_score>=70 THEN 1 ELSE 0 END) high_activity FROM communities").first() as {total:number;active:number;high_activity:number}|null;
        const opp=await env.DB.prepare("SELECT COUNT(*) n FROM opportunities WHERE status NOT IN ('lost','dismissed')").first() as {n:number}|null;
        return json({communities:rows.results,stats:{total:stats?.total||0,active:stats?.active||0,high_activity:stats?.high_activity||0,opportunities:opp?.n||0}});
      }

      if (url.pathname === "/api/communities" && request.method === "POST") {
        const b=await request.json() as Record<string,string>;
        if(!b.name?.trim()||!b.platform?.trim()) return json({error:"name and platform are required"},400);
        const ts=now(),cid=uid(),sid=uid();
        await env.DB.prepare("INSERT INTO communities (id,platform,external_id,name,url,category,geography,access_type,monitoring_status,activity_score,opportunity_score,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)")
          .bind(cid,b.platform,b.external_id||null,b.name.trim(),b.url||null,b.category||null,b.geography||null,b.access_type||"unknown","active",0,0,ts,ts).run();
        await env.DB.prepare("INSERT INTO sources (id,community_id,adapter,external_url,status) VALUES (?,?,?,?,?)")
          .bind(sid,cid,"manual",b.url||null,"active").run();
        await audit(env,"community.created","community",cid,{platform:b.platform,source:"manual"});
        return json({id:cid,source_id:sid},201);
      }
      return json({error:"NOT_FOUND"},404);
    } catch(e) {
      return json({error:"INTERNAL_ERROR",message:e instanceof Error?e.message:"unknown"},500);
    }
  }
};
