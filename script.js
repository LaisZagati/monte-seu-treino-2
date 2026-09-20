(function () {
  const ICONS = {
    halteres: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="9" width="3" height="6" rx="1"/><rect x="19" y="9" width="3" height="6" rx="1"/><rect x="5" y="10.5" width="2" height="3"/><rect x="17" y="10.5" width="2" height="3"/><line x1="7" y1="12" x2="17" y2="12"/></svg>`,
    barra: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="2" y="10" width="3" height="4"/><rect x="19" y="10" width="3" height="4"/><line x1="5" y1="12" x2="19" y2="12"/><rect x="5" y="9" width="2.4" height="6"/><rect x="16.6" y="9" width="2.4" height="6"/></svg>`,
    corpo: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="4.5" r="2.3"/><path d="M12 7v7"/><path d="M12 9l-5 3"/><path d="M12 9l5 3"/><path d="M12 14l-3.5 6"/><path d="M12 14l3.5 6"/></svg>`
  };

  const DEMO_GOALS = {
    peso: {
      label: "Perder peso", short: "Circuito metabólico full body.", color: "var(--peso)",
      exercises: [
        { nome: "Agachamento com halteres", equip: "Halteres", icon: "halteres", sets: "4x15", grupo: "Pernas e glúteos" },
        { nome: "Burpee", equip: "Peso corporal", icon: "corpo", sets: "4x10", grupo: "Corpo todo" }
      ]
    },
    bunda: {
      label: "Crescer glúteos", short: "Ativação e sobrecarga do glúteo.", color: "var(--bunda)",
      exercises: [
        { nome: "Hip thrust com barra", equip: "Barra e banco", icon: "barra", sets: "4x12", grupo: "Glúteos" },
        { nome: "Agachamento sumô com halter", equip: "Halter", icon: "halteres", sets: "4x15", grupo: "Glúteos e adutores" }
      ]
    }
  };

  const goalGrid = document.getElementById("demoGoalGrid");
  const panel = document.getElementById("demoPanel");
  let active = null;

  function render() {
    goalGrid.innerHTML = "";
    Object.entries(DEMO_GOALS).forEach(([key, g]) => {
      const btn = document.createElement("button");
      btn.className = "goal-card-d";
      btn.dataset.active = String(key === active);
      btn.style.setProperty("--accent", g.color);
      btn.innerHTML = `<span class="dot-d" style="background:${g.color}"></span><h4>${g.label}</h4><p>${g.short}</p>`;
      btn.addEventListener("click", () => { active = key; render(); });
      goalGrid.appendChild(btn);
    });

    panel.innerHTML = "";
    if (!active) return;
    const g = DEMO_GOALS[active];
    g.exercises.forEach((ex) => {
      const card = document.createElement("div");
      card.className = "ex-card-d";
      card.style.setProperty("--accent", g.color);
      card.innerHTML = `
        <div class="icon-d" style="color:${g.color}">${ICONS[ex.icon]}</div>
        <div>
          <h5>${ex.nome}</h5>
          <div class="tags-d">${ex.equip} &middot; ${ex.grupo}</div>
        </div>
        <div class="sets-d" style="color:${g.color}">${ex.sets}</div>
      `;
      panel.appendChild(card);
    });
    const lock = document.createElement("div");
    lock.className = "demo-lock";
    lock.innerHTML = `Mais 2 objetivos e o restante da rotina completa estão na <a href="#comprar">versão completa</a>.`;
    panel.appendChild(lock);
  }

  render();
})();