const pageMap = {
  inicio:0, tutoriais:1, territorio:2, aconteceu:3,
  producao:4, aniversario:5, espaco:6, psicologia:7,
  saude:8, seguranca:9, telefones:10, missao:11
};

function goPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  const pg = document.getElementById('pg-' + id);
  if (pg) pg.classList.add('active');
  const idx = pageMap[id];
  if (idx !== undefined) {
    const items = document.querySelectorAll('.nav-item');
    if (items[idx]) items[idx].classList.add('active');
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
