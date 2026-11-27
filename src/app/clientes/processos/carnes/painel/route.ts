import { PANEL_HTML } from "@/lib/processos/carnes-assets";
import { authorize, pageError } from "@/lib/processos/server";
export const dynamic = "force-dynamic";

const guideViewer = `
<style>
#step-guide { padding:0; border:0; width:min(1100px,96vw); max-width:96vw; border-radius:12px; }
#step-guide::backdrop { background:rgba(10,36,30,.6); }
#step-guide .guide-toolbar { padding:12px 18px; background:white; border-bottom:1px solid #d9eae7; }
#step-guide iframe { display:block; width:100%; height:75vh; height:75dvh; border:0; }
</style>
<dialog id="step-guide" aria-label="Guia da etapa">
 <form method="dialog" class="guide-toolbar"><button autofocus class="btn">Voltar às etapas</button></form>
 <iframe title="Como fazer esta etapa"></iframe>
</dialog>
<script>
(() => {
 const dialog = document.getElementById('step-guide');
 const frame = dialog.querySelector('iframe');
 let trigger;
 document.addEventListener('click', event => {
  const link = event.target.closest('a');
  if (!link || link.origin !== location.origin || link.pathname !== '/clientes/processos/carnes/guia') return;
  if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  event.stopPropagation();
  trigger = link;
  frame.src = link.href;
  dialog.showModal();
 }, true);
 frame.addEventListener('load', () => {
  const inner = frame.contentDocument;
  const back = inner && inner.querySelector('a[href="/clientes/processos/carnes/painel"]');
  if (back) back.onclick = event => { event.preventDefault(); dialog.close(); };
 });
 dialog.addEventListener('close', () => {
  frame.removeAttribute('src');
  if (trigger && trigger.isConnected) trigger.focus({preventScroll:true});
 });
})();
</script>`;
const panelWithGuide = PANEL_HTML.replace("</html>", guideViewer + "</html>");

export async function GET(request: Request) {
  try {
    await authorize(request);
    return new Response(panelWithGuide, { headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff", "X-Frame-Options": "SAMEORIGIN", "Content-Security-Policy": "frame-ancestors 'self'" } });
  } catch (error) {
    return pageError(error, request);
  }
}
