const pageMap = {
  inicio:0, tutoriais:1, territorio:2, aconteceu:3,
  producao:4, espaco:6, telefones:10, missao:11
};

function switchSubTab(tabId) {
  // 1. Remove as classes ativas de todas as sub-abas e botões dentro da página Espaço Funcionário
  document.querySelectorAll('#pg-espaco .subtab-content').forEach(c => c.classList.remove('active'));
  document.querySelectorAll('#pg-espaco .subtab-btn').forEach(b => b.classList.remove('active'));

  // 2. Ativa o contêiner de conteúdo da sub-aba selecionada
  const targetContent = document.getElementById(tabId);
  if (targetContent) {
    targetContent.classList.add('active');
  }

  // 3. Ativa o botão da sub-aba correspondente
  const targetBtn = document.querySelector(`#pg-espaco .subtab-btn[onclick*="${tabId}"]`);
  if (targetBtn) {
    targetBtn.classList.add('active');
  }
}

function goPage(id) {
  // Redireciona IDs de páginas antigas consolidadas para as novas sub-abas dinâmicas do Espaço Funcionário
  const redirectMap = {
    'aniversario': 'sub-aniversariantes',
    'psicologia': 'sub-psicologia',
    'saude': 'sub-saude',
    'seguranca': 'sub-seguranca'
  };

  let targetSubTab = null;
  if (redirectMap[id]) {
    targetSubTab = redirectMap[id];
    id = 'espaco';
  }

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

  // Se a página de destino for o Espaço Funcionário
  if (id === 'espaco') {
    if (targetSubTab) {
      switchSubTab(targetSubTab);
    } else {
      // Se acessado diretamente, garante que tenhamos pelo menos uma sub-aba ativa (default: Sistemas & RH)
      const activeTab = document.querySelector('#pg-espaco .subtab-content.active');
      if (!activeTab) {
        switchSubTab('sub-sistemas');
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
