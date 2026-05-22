const pageMap = {
  inicio:0, tutoriais:1, territorio:2, aconteceu:3,
  producao:4, aniversario:5, espaco:6, psicologia:7,
  saude:8, seguranca:9, telefones:10, missao:11
};

function goPage(id) {
  // 1. Oculta todas as páginas do site
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  
  // 2. Desativa o estilo ativo de todos os links e categorias
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.querySelectorAll('.nav-dropbtn').forEach(b => b.classList.remove('active'));
  
  // 3. Exibe a página clicada
  const pg = document.getElementById('pg-' + id);
  if (pg) pg.classList.add('active');
  
  // 4. Destaca o link ativo com base no atributo data-page
  const activeNavItem = document.querySelector(`.nav-item[data-page="${id}"]`);
  if (activeNavItem) {
    activeNavItem.classList.add('active');
    
    // 5. Se o item estiver dentro de um dropdown, destaca a categoria pai
    const parentDropdown = activeNavItem.closest('.nav-dropdown');
    if (parentDropdown) {
      const dropbtn = parentDropdown.querySelector('.nav-dropbtn');
      if (dropbtn) {
        dropbtn.classList.add('active');
      }
    }
  }
  
  // 6. Rola a página suavemente de volta para o topo
  window.scrollTo({ top: 0, behavior: 'smooth' });
  
  // 7. No celular, fecha as categorias após clicar em um link
  if (window.innerWidth <= 768) {
    document.querySelectorAll('.nav-dropdown').forEach(d => d.classList.remove('open'));
  }
}

// Comportamento do menu sanfonado no Celular/Tablet
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.nav-dropdown .nav-dropbtn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        e.stopPropagation();
        const parent = btn.closest('.nav-dropdown');
        const isOpen = parent.classList.contains('open');
        
        // Fecha outros dropdowns abertos
        document.querySelectorAll('.nav-dropdown').forEach(d => {
          if (d !== parent) d.classList.remove('open');
        });
        
        // Alterna o estado do dropdown atual
        parent.classList.toggle('open', !isOpen);
      }
    });
  });
  
  // Fecha o dropdown se clicar fora em telas mobile
  document.addEventListener('click', () => {
    if (window.innerWidth <= 768) {
      document.querySelectorAll('.nav-dropdown').forEach(d => d.classList.remove('open'));
    }
  });
});
