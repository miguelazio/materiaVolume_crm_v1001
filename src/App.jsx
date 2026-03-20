import React, { useState, useEffect } from "react";
import Auth from "./Auth";
import CreateUser from "./CreateUser";
import { supabase } from "./supabaseClient";

import "./dynamic.css";



// ── Fonts ────────────────────────────────────────────────────────────────────

const fontLink = document.createElement("link");

fontLink.href = "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700&family=Inter:wght@400;500;600&display=swap";

fontLink.rel = "stylesheet";

document.head.appendChild(fontLink);



// ── i18n ─────────────────────────────────────────────────────────────────────

const T = {

  en: {

    pipeline: "Pipeline B2B", projects: "Active Projects", vault: "MateriaVault",

    content: "Content Calendar", jobs: "Plan B", topbar_jobs: "Plan B — Job Hunt",
    users: "User Management",

    software: "Software", topbar_software: "Software Manager",

    kanban: "⊞ Kanban", table: "☰ Table",

    sw_total: "Total Software", sw_in_catalog: "in catalog", sw_in_use: "In Use", sw_across_projects: "across projects",

    sw_categories: "Categories", sw_available: "defined",

    sw_add: "+ Add Software", sw_search: "Search software…",

    sw_cat_all: "All",

    sw_used_in: "Used in", sw_projects_label: "projects", sw_no_projects: "Not used yet",

    sw_name_ph: "Software name", sw_category_ph: "Category",

    sw_cat_labels: { dcc: "3D / DCC", sculpt: "Sculpting", tex: "Texturing", track: "Tracking", light: "Lighting / Render", comp: "Compositing", ai: "AI Tools", mgmt: "Management", other: "Other" },

    add_lead: "+ Add Lead", new_project: "+ New Project",

    new_post: "+ New Post", add_application: "+ Add Application",

    edit: "Edit", save: "Save", cancel: "Cancel", delete: "Delete",

    total_leads: "Total Leads", in_funnel: "in funnel",

    meetings: "Meetings", sched_above: "scheduled or above",

    won: "Won", closed_clients: "closed clients",

    followups_due: "Follow-ups Due", overdue: "overdue",

    active: "Active", in_progress: "in progress",

    invoiced: "Invoiced", completed: "completed",

    fully_paid: "Fully Paid", done_label: "40/30/30 done",

    funnel_stages: ["To Contact", "1st Email Sent", "Awaiting Reply", "Meeting Scheduled", "Proposal Sent", "Won", "Lost"],

    types: ["Event Agency", "Luxury Real Estate", "Post-Production", "Museography Studio"],

    project_phases: ["Briefing & Prep", "Concept & Blocking", "Modeling & Rigging", "Texturing & Shading", "Tracking & Match", "Lighting & FX", "Render & Comp", "Delivery & Archive"],

    payment_labels: ["40% Award", "30% Beta", "30% Final"],

    post_types: ["🎬 Making-of / BTS", "✨ Showcase", "📚 Market Education"],

    post_statuses: ["Idea", "Recording", "Editing", "Published"],

    app_statuses: ["Sent", "Under Review", "Interview", "Accepted", "Rejected"],

    all: "All", type_label: "Type:", search_placeholder: "Search company / contact…",

    add_custom_type: "+ New Type", custom_type_placeholder: "Type name...",

    overdue_alert: (n, names) => `${n} follow-up${n > 1 ? "s" : ""} overdue: ${names}. Time to send a message!`,

    planb_alert: "Plan B is dormant. Activate only from Month 6 if freelance revenue is not sustaining. Job title:",

    planb_job_title: "Unreal Engine Generalist / Technical Artist",

    fu_overdue: (d) => `${d}d overdue`, fu_today: "Today", fu_in: (d) => `in ${d}d`,

    th_company: "Company", th_type: "Type", th_contact: "Contact",

    th_status: "Status", th_followup: "Follow-up", th_actions: "Actions",

    th_position: "Position", th_platform: "Platform", th_date: "Date", th_cv: "CV", th_created_at: "Created",

    no_leads: "No leads found.", no_apps: "No applications yet.",

    edit_lead: "Edit Lead", new_lead: "New Lead",

    lbl_company: "Company / Agency", lbl_type: "Type",

    lbl_contact: "Contact (Decision Maker)", lbl_phone: "Phone", lbl_email: "Email", lbl_linkedin: "LinkedIn URL",

    lbl_funnel: "Funnel Status", lbl_followup: "Follow-up Date", lbl_created_at: "Creation Date",

    sort_date_desc: "Newest First", sort_date_asc: "Oldest First",

    lbl_notes: "Notes / Scripts", ph_notes: "Meeting notes, email scripts…",

    edit_project: "Edit Project", new_project_title: "New Project",

    lbl_proj_name: "Project Name", lbl_client: "Client",

    lbl_phase: "Current Phase", lbl_partner: "Assigned Partner", lbl_phase_tasks: "Phase Deliverables",

    ph_partner: "Hardware Ninja, etc.",

    lbl_assets: "Assets Cloud Link", ph_assets: "https://drive.google.com/…",

    edit_post: "Edit Post", new_post_title: "New Post",

    lbl_post_type: "Post Type", lbl_post_status: "Status",

    lbl_title: "Title", lbl_body: "Content / Description", lbl_publish_date: "Publish Date",

    edit_app: "Edit Application", new_app: "New Application",

    lbl_company_studio: "Company / Studio", lbl_job_pos: "Position",

    lbl_platform: "Platform", lbl_app_date: "Application Date",

    lbl_app_status: "Status", lbl_cv: "CV Version", ph_cv: "cv_unreal_v2.pdf",

    boilerplates: "⚙ Boilerplates", money_shots: "🎬 Money Shots", case_studies: "📋 Case Studies",

    vault_upload: "📤 Upload File", vault_add_url: "🔗 Add URL", vault_category: "Category", vault_uploading: "Uploading…",
    vault_loading: "Loading files…", vault_no_files: "No files uploaded yet.",
    vault_open: "Open", vault_delete: "Delete", vault_uploaded: "Uploaded",
    vault_select_file: "Select a file…", vault_drop: "or drag & drop here",
    vault_url_placeholder: "https://…", vault_url_name: "Link name", vault_add: "Add",
    vault_type_file: "📁 File", vault_type_url: "🔗 URL",
    vault_sync: "↻ Sync Drive", vault_syncing: "Syncing…", vault_synced: "Synced!",
    vault_categories: { Boilerplates: "Boilerplates", MoneyShots: "Money Shots", CaseStudies: "Case Studies", Contracts: "Contracts", Renders: "Renders", References: "References", Other: "Other" },
    vault_edit_item: "Edit Item",
    vault_manage_categories: "Manage Categories",

    btn_scripts: "📜 Scripts",

    manage_scripts: "Manage Custom Messages",

    new_script: "+ New Script",

    script_title: "Message Title (e.g. 1st Outreach)",

    script_content: "Message Content",

    choose_script: "— Select a Custom Message —",

    apply_script: "Apply to Notes",

    partners: "Partners",

    add_partner: "+ Add Partner",

    total_partners: "Total Partners",

    onboarded_partners: "Onboarded",

    partner_statuses: ["Identified", "Contacted", "Meeting Set", "Onboarded", "Inactive"],

    th_specialty: "Specialty",

    edit_partner: "Edit Partner", new_partner: "New Partner",

    lbl_specialty: "Specialty / Service",

    lbl_associated_project: "Associated Project",

    none: "None",

  },

  pt: {

    pipeline: "Pipeline B2B", projects: "Projetos Ativos", vault: "MateriaVault",

    content: "Calendário de Conteúdo", jobs: "Plano B", topbar_jobs: "Plano B — Procura de Emprego",
    users: "Gestão de Utilizadores",

    software: "Software", topbar_software: "Gestor de Software",

    kanban: "⊞ Kanban", table: "☰ Tabela",

    sw_total: "Total Software", sw_in_catalog: "no catálogo", sw_in_use: "Em Uso", sw_across_projects: "em projetos",

    sw_categories: "Categorias", sw_available: "definidas",

    sw_add: "+ Adicionar Software", sw_search: "Pesquisar software…",

    sw_cat_all: "Todos",

    sw_used_in: "Usado em", sw_projects_label: "projetos", sw_no_projects: "Ainda sem projetos",

    sw_name_ph: "Nome do software", sw_category_ph: "Categoria",

    sw_cat_labels: { dcc: "3D / DCC", sculpt: "Escultura", tex: "Texturas", track: "Tracking", light: "Iluminação / Render", comp: "Composição", ai: "Ferramentas IA", mgmt: "Gestão", other: "Outros" },

    add_lead: "+ Adicionar Lead", new_project: "+ Novo Projeto",

    new_post: "+ Nova Publicação", add_application: "+ Adicionar Candidatura",

    edit: "Editar", save: "Guardar", cancel: "Cancelar", delete: "Eliminar",

    total_leads: "Total de Leads", in_funnel: "no funil",

    meetings: "Reuniões", sched_above: "agendadas ou acima",

    won: "Ganhos", closed_clients: "clientes fechados",

    followups_due: "Follow-ups em Atraso", overdue: "em atraso",

    active: "Ativos", in_progress: "em progresso",

    invoiced: "Faturados", completed: "concluídos",

    fully_paid: "Pagos na Totalidade", done_label: "40/30/30 completo",

    funnel_stages: ["Para Contactar", "1º Email Enviado", "Aguardar Resposta", "Reunião Marcada", "Proposta Enviada", "Ganho", "Perdido"],

    types: ["Agência de Eventos", "Imobiliário de Luxo", "Pós-Produção", "Estúdio de Museografia"],

    project_phases: ["Briefing & Prep", "Conceito & Blocking", "Modelação & Rigging", "Texturas & Shading", "Tracking & Match", "Iluminação & FX", "Render & Comp", "Entrega & Arquivo"],

    payment_labels: ["40% Adjudicação", "30% Beta", "30% Final"],

    post_types: ["🎬 Making-of / BTS", "✨ Showcase", "📚 Educação de Mercado"],

    post_statuses: ["Ideia", "A Gravar", "A Editar", "Publicado"],

    app_statuses: ["Enviado", "Em Análise", "Entrevista", "Aceite", "Rejeitado"],

    all: "Todos", type_label: "Tipo:", search_placeholder: "Pesquisar empresa / contacto…",

    add_custom_type: "+ Novo Tipo", custom_type_placeholder: "Nome do tipo...",

    overdue_alert: (n, names) => `${n} follow-up${n > 1 ? "s" : ""} em atraso: ${names}. Está na hora de enviar mensagem!`,

    planb_alert: "O Plano B está inativo. Ativar apenas a partir do Mês 6 se o rendimento freelance não for suficiente. Título:",

    planb_job_title: "Unreal Engine Generalist / Technical Artist",

    fu_overdue: (d) => `${d}d em atraso`, fu_today: "Hoje", fu_in: (d) => `em ${d}d`,

    th_company: "Empresa", th_type: "Tipo", th_contact: "Contacto",

    th_status: "Estado", th_followup: "Follow-up", th_actions: "Ações",

    th_position: "Posição", th_platform: "Plataforma", th_date: "Data", th_cv: "CV", th_created_at: "Criado Em",

    no_leads: "Nenhum lead encontrado.", no_apps: "Ainda sem candidaturas.",

    edit_lead: "Editar Lead", new_lead: "Novo Lead",

    lbl_company: "Empresa / Agência", lbl_type: "Tipo",

    lbl_contact: "Contacto (Decisor)", lbl_phone: "Telemóvel", lbl_email: "Email", lbl_linkedin: "URL LinkedIn",

    lbl_funnel: "Estado do Funil", lbl_followup: "Data de Follow-up", lbl_created_at: "Data de Criação",

    sort_date_desc: "Mais Recente", sort_date_asc: "Mais Antigo",

    lbl_notes: "Notas / Scripts", ph_notes: "Notas da reunião, guiões de email…",

    edit_project: "Editar Projeto", new_project_title: "Novo Projeto",

    lbl_proj_name: "Nome do Projeto", lbl_client: "Cliente",

    lbl_phase: "Fase Atual", lbl_partner: "Parceiro Atribuído", lbl_phase_tasks: "Entregáveis da Fase",

    ph_partner: "Hardware Ninja, etc.",

    lbl_assets: "Link Cloud de Assets", ph_assets: "https://drive.google.com/…",

    edit_post: "Editar Publicação", new_post_title: "Nova Publicação",

    lbl_post_type: "Tipo de Post", lbl_post_status: "Estado",

    lbl_title: "Título", lbl_body: "Conteúdo / Descrição", lbl_publish_date: "Data de Publicação",

    edit_app: "Editar Candidatura", new_app: "Nova Candidatura",

    lbl_company_studio: "Empresa / Estúdio", lbl_job_pos: "Posição",

    lbl_platform: "Plataforma", lbl_app_date: "Data de Candidatura",

    lbl_app_status: "Estado", lbl_cv: "Versão do CV", ph_cv: "cv_unreal_v2.pdf",

    boilerplates: "⚙ Boilerplates", money_shots: "🎬 Money Shots", case_studies: "📋 Estudos de Caso",

    vault_upload: "📤 Carregar Ficheiro", vault_add_url: "🔗 Adicionar URL", vault_category: "Categoria", vault_uploading: "A carregar…",
    vault_loading: "A carregar ficheiros…", vault_no_files: "Ainda sem ficheiros carregados.",
    vault_open: "Abrir", vault_delete: "Eliminar", vault_uploaded: "Carregado",
    vault_select_file: "Selecionar ficheiro…", vault_drop: "ou arrastar aqui",
    vault_url_placeholder: "https://…", vault_url_name: "Nome do link", vault_add: "Adicionar",
    vault_type_file: "📁 Ficheiro", vault_type_url: "🔗 URL",
    vault_sync: "↻ Sincronizar Drive", vault_syncing: "A sincronizar…", vault_synced: "Sincronizado!",
    vault_categories: { Boilerplates: "Boilerplates", MoneyShots: "Money Shots", CaseStudies: "Estudos de Caso", Contracts: "Contratos", Renders: "Renders", References: "Referências", Other: "Outros" },
    vault_edit_item: "Editar Item",
    vault_manage_categories: "Gerir Categorias",

    btn_scripts: "📜 Scripts",

    manage_scripts: "Gerir Mensagens Personalizadas",

    new_script: "+ Nova Mensagem",

    script_title: "Título da Mensagem (ex: 1º Contacto)",

    script_content: "Conteúdo da Mensagem",

    choose_script: "— Escolher Mensagem —",

    apply_script: "Aplicar às Notas",

    partners: "Parceiros",

    add_partner: "+ Adicionar Parceiro",
    total_partners: "Total de Parceiros",
    onboarded_partners: "Integrados",
    partner_statuses: ["Identificado", "Contactado", "Reunião Marcada", "Integrado", "Inativo"],
    th_specialty: "Especialidade",
    edit_partner: "Editar Parceiro", new_partner: "Novo Parceiro",
    lbl_specialty: "Especialidade / Serviço",
    lbl_associated_project: "Projeto Associado",
    none: "Nenhum"
  }
};

const STAGE_CLASS = ["s0", "s1", "s2", "s3", "s4", "s5", "s6"];
const TYPE_BADGE = ["badge-event", "badge-realestate", "badge-post", "badge-museum", "badge-custom"];
const STATUS_COLORS = ["#6b7280", "#f59e0b", "#3b82f6", "#22c55e"];

const PHASE_DATA = {
  en: Array(8).fill({ tasks: [{ desc: "Task", type: "chk" }], deliverables: "", rule: "" }),
  pt: Array(8).fill({ tasks: [{ desc: "Task", type: "chk" }], deliverables: "", rule: "" })
};

const SOFTWARE_CATEGORIES = ["dcc", "sculpt", "tex", "track", "light", "comp", "ai", "mgmt", "other"];

export default function App() {
  const [session, setSession] = React.useState(null);

  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const [lang, setLang] = React.useState("pt");
  const [theme, setTheme] = React.useState("dark");
  const [tab, setTab] = React.useState("pipeline");
  const [viewMode, setViewMode] = React.useState("table");
  const [modal, setModal] = React.useState(null);
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [swSearch, setSwSearch] = React.useState("");
  const [swFilter, setSwFilter] = React.useState("all");
  const [newSw, setNewSw] = React.useState({ name: "", category: "dcc", icon: "" });

  const getToolUsageCount = (toolName) => {
    return projects.filter(p => {
      if (!p.customTools) return false;
      return Object.values(p.customTools).some(arr => arr.includes(toolName));
    }).length;
  };

  const addSoftware = async () => {
    if (newSw.name.trim()) {
      const { data } = await supabase.from('software_catalog').insert([{ name: newSw.name, category: newSw.category, icon: newSw.icon || "💻" }]).select().single();
      if (data) setSoftwareCatalog(prev => [...prev, data]);
      setNewSw({ name: "", category: "dcc", icon: "" });
      setAddingSw(false);
    }
  };

  const removeSoftware = async (swId) => {
    await supabase.from('software_catalog').delete().eq('id', swId);
    setSoftwareCatalog(prev => prev.filter(s => s.id !== swId));
  };
  const [filterStatus, setFilterStatus] = React.useState("all");
  const [filterType, setFilterType] = React.useState("all");
  const [sortOrder, setSortOrder] = React.useState("desc");
  const [addingSw, setAddingSw] = React.useState(false);
  const [editMode, setEditMode] = React.useState(false);

  const t = T[lang] || T.en;

  const TABS = [
    ["pipeline", "◱", t.pipeline],
    ["projects", "◈", t.projects],
    ["software", "⚙", t.software],
    ["partners", "❈", t.partners],
    ["vault", "◎", t.vault],
    ["content", "↻", t.content],
    ["jobs", "⌖", t.jobs],
    ["users", "👥", t.users]
  ];

  const TITLES = { pipeline: t.pipeline, projects: t.projects, partners: t.partners, software: t.topbar_software || t.software, content: t.content, jobs: t.topbar_jobs || t.jobs, users: t.users };

  // Dummy Initial States
  const [leads, setLeads] = React.useState([]);
  const [projects, setProjects] = React.useState([]);
  const [partners, setPartners] = React.useState([]);
  const [softwareCatalog, setSoftwareCatalog] = React.useState([]);
  const [content, setContent] = React.useState([]);
  const [jobs, setJobs] = React.useState([]);
  const [customMessages, setCustomMessages] = React.useState([]);
  const [f, setF] = React.useState(null);

  // Vault state (Supabase + Google Drive)
  const [vaultItems, setVaultItems] = React.useState([]);
  const [vaultLoading, setVaultLoading] = React.useState(false);
  const [vaultUploading, setVaultUploading] = React.useState(false);
  const [vaultCategory, setVaultCategory] = React.useState("Boilerplates");
  const [vaultFilter, setVaultFilter] = React.useState("all");
  const [vaultUrlName, setVaultUrlName] = React.useState("");
  const [vaultUrlValue, setVaultUrlValue] = React.useState("");
  const [vaultAddingUrl, setVaultAddingUrl] = React.useState(false);
  const [vaultSyncing, setVaultSyncing] = React.useState(false);
  const [vaultSyncMsg, setVaultSyncMsg] = React.useState("");
  const [dbVaultCategories, setDbVaultCategories] = React.useState([]);
  const VAULT_CATEGORIES = dbVaultCategories.length > 0 ? dbVaultCategories.map(c => c.key) : ["Boilerplates", "MoneyShots", "CaseStudies", "Contracts", "Renders", "References", "Other"];

  const getCategoryLabel = (catKey) => {
    const dbCat = dbVaultCategories.find(c => c.key === catKey);
    return dbCat ? (lang === 'pt' ? dbCat.label_pt : dbCat.label_en) : (t.vault_categories[catKey] || catKey);
  };

  const loadVaultItems = async () => {
    setVaultLoading(true);
    try {
      const { data } = await supabase.from('vault_items').select('*').order('created_at', { ascending: false });
      if (data) setVaultItems(data);
    } catch (e) { console.error('Failed to load vault items:', e); }
    setVaultLoading(false);
  };

  const uploadVaultFile = async (file) => {
    if (!file) return;
    setVaultUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('category', vaultCategory);
      const res = await fetch('http://localhost:3001/api/upload', { method: 'POST', body: formData });
      const driveData = await res.json();
      if (driveData.success) {
        // Save to Supabase
        const { data: dbItem } = await supabase.from('vault_items').insert([{
          name: driveData.file.name,
          category: vaultCategory,
          type: 'file',
          url: driveData.file.webViewLink || '',
          drive_file_id: driveData.file.id,
          drive_link: driveData.file.webViewLink || '',
          mime_type: driveData.file.mimeType || '',
          file_size: driveData.file.size || '',
          tag: file.name.split('.').pop()?.toUpperCase() || '',
        }]).select().single();
        if (dbItem) setVaultItems(prev => [dbItem, ...prev]);
      }
    } catch (e) { console.error('Upload failed:', e); }
    setVaultUploading(false);
  };

  const addVaultUrl = async () => {
    if (!vaultUrlValue.trim()) return;
    setVaultAddingUrl(true);
    try {
      const { data } = await supabase.from('vault_items').insert([{
        name: vaultUrlName.trim() || vaultUrlValue.trim(),
        category: vaultCategory,
        type: 'url',
        url: vaultUrlValue.trim(),
        tag: 'URL',
      }]).select().single();
      if (data) setVaultItems(prev => [data, ...prev]);
      setVaultUrlName('');
      setVaultUrlValue('');
    } catch (e) { console.error('Add URL failed:', e); }
    setVaultAddingUrl(false);
  };

  const deleteVaultItem = async (item) => {
    try {
      // If it's a Drive file, also delete from Drive
      if (item.drive_file_id) {
        await fetch(`http://localhost:3001/api/files/${item.drive_file_id}`, { method: 'DELETE' }).catch(() => {});
      }
      await supabase.from('vault_items').delete().eq('id', item.id);
      setVaultItems(prev => prev.filter(v => v.id !== item.id));
    } catch (e) { console.error('Delete failed:', e); }
  };

  React.useEffect(() => { if (tab === 'vault' && session) loadVaultItems(); }, [tab, session]);

  const syncVaultFromDrive = async () => {
    setVaultSyncing(true);
    setVaultSyncMsg('');
    try {
      // 1. Fetch all files from Google Drive
      const res = await fetch('http://localhost:3001/api/files');
      const driveData = await res.json();
      if (!driveData.files) { setVaultSyncing(false); return; }

      // 2. Get existing drive_file_ids in Supabase
      const { data: existing } = await supabase.from('vault_items').select('drive_file_id');
      const existingIds = new Set((existing || []).map(e => e.drive_file_id).filter(Boolean));

      // 3. Find new files not yet in Supabase
      const newFiles = driveData.files.filter(f => !existingIds.has(f.id));

      if (newFiles.length > 0) {
        const inserts = newFiles.map(f => ({
          name: f.name,
          category: f.category || 'Other',
          type: 'file',
          url: f.webViewLink || '',
          drive_file_id: f.id,
          drive_link: f.webViewLink || '',
          mime_type: f.mimeType || '',
          file_size: f.size || '',
          tag: f.name?.split('.').pop()?.toUpperCase() || '',
        }));
        await supabase.from('vault_items').insert(inserts);
      }

      // 4. Reload all vault items
      await loadVaultItems();
      setVaultSyncMsg(`+${newFiles.length}`);
      setTimeout(() => setVaultSyncMsg(''), 3000);
    } catch (e) { console.error('Sync failed:', e); }
    setVaultSyncing(false);
  };

  React.useEffect(() => {
    if (!session) return;
    async function loadData() {
      supabase.from('leads').select('*').then(({data}) => data && setLeads(data));
      supabase.from('projects').select('*').then(({data}) => data && setProjects(data));
      supabase.from('partners').select('*').then(({data}) => data && setPartners(data));
      supabase.from('software_catalog').select('*').then(({data}) => data && setSoftwareCatalog(data));
      supabase.from('content_calendar').select('*').then(({data}) => data && setContent(data));
      supabase.from('jobs').select('*').then(({data}) => data && setJobs(data));
      supabase.from('custom_messages').select('*').then(({data}) => data && setCustomMessages(data));
      supabase.from('vault_categories').select('*').then(({data}) => data && setDbVaultCategories(data.sort((a,b)=>a.label_en.localeCompare(b.label_en))));
    }
    loadData();
  }, [session]);

  const filteredPartners = partners.filter(p => !search || p.company?.toLowerCase().includes(search.toLowerCase()));

  // Handlers
  const saveVaultItem = async (d) => {
    if (d.id) {
      const { data } = await supabase.from('vault_items').update(d).eq('id', d.id).select().single();
      if (data) setVaultItems(p => p.map(v => v.id === d.id ? data : v));
    }
    setModal(null);
  };

  const reloadVaultCategories = async () => {
    const { data } = await supabase.from('vault_categories').select('*');
    if (data) setDbVaultCategories(data.sort((a,b)=>a.label_en.localeCompare(b.label_en)));
  };

  const saveLead = async (d) => { if(d.id){ const {data} = await supabase.from('leads').update(d).eq('id', d.id).select().single(); if(data) setLeads(p=>p.map(l=>l.id===d.id?data:l)); } else { const {data} = await supabase.from('leads').insert([d]).select().single(); if(data) setLeads(p=>[...p, data]); } setModal(null); };
  const deleteLead = async (id) => { await supabase.from('leads').delete().eq('id', id); setLeads(p=>p.filter(l=>l.id!==id)); setModal(null); };
  const saveProject = async (d) => {
    // Only send columns that exist in the DB
    const payload = {
      name: d.name,
      client: d.client,
      phase: d.phase,
      partner: d.partner,
      assets: d.assets,
      tasks: d.tasks || [],
      paid: d.paid || [false, false, false],
      customTools: d.customTools || {},
      phaseNotes: d.phaseNotes || {},
      selectedTools: d.selectedTools || {},
    };
    if (d.id) {
      const { data, error } = await supabase.from('projects').update(payload).eq('id', d.id).select().single();
      if (error) { console.error('saveProject update error:', error); return; }
      if (data) setProjects(p => p.map(x => x.id === d.id ? data : x));
    } else {
      const { data, error } = await supabase.from('projects').insert([payload]).select().single();
      if (error) { console.error('saveProject insert error:', error); return; }
      if (data) setProjects(p => [...p, data]);
    }
    setModal(null);
  };
  const togglePaid = async (id, idx) => { const proj = projects.find(p=>p.id===id); if(!proj) return; const paid = [...proj.paid]; paid[idx] = !paid[idx]; const {data} = await supabase.from('projects').update({paid}).eq('id', id).select().single(); if(data) setProjects(p=>p.map(x=>x.id===id?data:x)); };
  const savePartner = async (d) => { if(d.id){ const {data} = await supabase.from('partners').update(d).eq('id', d.id).select().single(); if(data) setPartners(p=>p.map(x=>x.id===d.id?data:x)); } else { const {data} = await supabase.from('partners').insert([d]).select().single(); if(data) setPartners(p=>[...p, data]); } setModal(null); };
  const deletePartner = async (id) => { await supabase.from('partners').delete().eq('id', id); setPartners(p=>p.filter(x=>x.id!==id)); setModal(null); };
  const saveContent = async (d) => { if(d.id){ const {data} = await supabase.from('content_calendar').update(d).eq('id', d.id).select().single(); if(data) setContent(p=>p.map(x=>x.id===d.id?data:x)); } else { const {data} = await supabase.from('content_calendar').insert([d]).select().single(); if(data) setContent(p=>[...p, data]); } setModal(null); };
  const saveJob = async (d) => { if(d.id){ const {data} = await supabase.from('jobs').update(d).eq('id', d.id).select().single(); if(data) setJobs(p=>p.map(x=>x.id===d.id?data:x)); } else { const {data} = await supabase.from('jobs').insert([d]).select().single(); if(data) setJobs(p=>[...p, data]); } setModal(null); };

  React.useEffect(() => { document.documentElement.setAttribute("data-theme", theme); }, [theme]);

  const allTypes = [...t.types];
  const fuClass = (d) => {
    if(!d) return "";
    const today = new Date().toISOString().split("T")[0];
    if (d < today) return "follow-up-overdue";
    if (d === today || d === new Date(Date.now()+86400000).toISOString().split("T")[0]) return "follow-up-soon";
    return "";
  };
  const fuLabel = (d, tStr) => {
    if(!d) return "";
    const today = new Date().toISOString().split("T")[0];
    if(d < today) {
       const diff = Math.ceil((new Date(today) - new Date(d)) / (1000*3600*24));
       return typeof tStr.fu_overdue === 'function' ? tStr.fu_overdue(diff) : "overdue";
    }
    if (d === today) return tStr.fu_today;
    const diff = Math.ceil((new Date(d) - new Date(today)) / (1000*3600*24));
    return typeof tStr.fu_in === 'function' ? tStr.fu_in(diff) : "soon";
  };
  
  const deleteMessage = async (id) => {
    await supabase.from('custom_messages').delete().eq('id', id);
    setCustomMessages(ms => ms.filter(m => m.id !== id));
  };

  const stats = {
    total: leads.length,
    meetings: leads.filter(l => l.status >= 3).length,
    won: leads.filter(l => l.status === 5).length
  };
  const todayStr = new Date().toISOString().split("T")[0];
  const overdue = leads.filter(l => l.followUp && l.followUp < todayStr && l.status < 5);

  const filteredLeads = leads.filter(l => {
    if (search && !l.company.toLowerCase().includes(search.toLowerCase())) return false;
    if (filterStatus !== "all" && String(l.status) !== filterStatus) return false;
    if (filterType !== "all" && String(l.type_key) !== filterType) return false;
    return true;
  }).sort((a,b) => {
    if (sortOrder === "desc") return (b.createdAt||"").localeCompare(a.createdAt||"");
    return (a.createdAt||"").localeCompare(b.createdAt||"");
  });

  if (!session) {
    return <Auth />;
  }

  return (

    <div className="app">

      {/* SIDEBAR */}

      <nav className={`sidebar${sidebarOpen ? " open" : ""}`}>

        <div className="sidebar-logo">
          MV<span style={{ color: "var(--accent)" }}>.</span>
          <button className="sidebar-close-btn" onClick={() => setSidebarOpen(false)}>×</button>
        </div>

        {TABS.map(([k, icon, label]) => {
          if (k === "users" && session?.user?.email !== 'vfxmiguel@gmail.com') return null;
          return (
            <div key={k} className={`nav-item${tab === k ? " active" : ""}`} onClick={() => { setTab(k); setSidebarOpen(false); }}>
              <span className="nav-icon">{icon}</span>{label}
            </div>
          );
        })}

        {/* ── Theme Switcher ── */}

        <div className="lang-switcher" style={{ marginBottom: "10px", marginTop: "auto" }}>

          <button className={`lang-btn${theme === "dark" ? " active" : ""}`} onClick={() => setTheme("dark")}>

            Dark

          </button>

          <button className={`lang-btn${theme === "light" ? " active" : ""}`} onClick={() => setTheme("light")}>

            Light

          </button>

        </div>



        {/* ── Language Switcher ── */}
        <div className="lang-switcher" style={{ margin: "0 16px", marginBottom: "10px" }}>
          <button className={`lang-btn${lang === "pt" ? " active" : ""}`} onClick={() => setLang("pt")}>
            🇵🇹 PT
          </button>
          <button className={`lang-btn${lang === "en" ? " active" : ""}`} onClick={() => setLang("en")}>
            🇬🇧 EN
          </button>
        </div>

        <div className="lang-switcher" style={{ margin: "0 16px", marginBottom: "24px" }}>
          <button className="lang-btn" onClick={() => supabase.auth.signOut()} style={{ width: "100%", justifyContent: "center", color: "var(--accent)" }}>
            {t.logout || "Logout"}
          </button>
        </div>

      </nav>



      {/* MAIN */}

      <div className="main">

        <div className="topbar">

          <div className="topbar-left">
            <button className="sidebar-toggle" onClick={() => setSidebarOpen(true)}>☰</button>
            <div className="topbar-title">{TITLES[tab]}</div>
          </div>

          <div className="topbar-actions">

            {tab === "pipeline" && <>

              <button className="btn btn-ghost btn-sm" onClick={() => setModal({ type: "messages", data: null })}>{t.btn_scripts}</button>

              <button className="btn btn-ghost btn-sm" onClick={() => setViewMode(v => v === "table" ? "kanban" : "table")}>{viewMode === "table" ? t.kanban : t.table}</button>

              <button className="btn btn-primary btn-sm" onClick={() => setModal({ type: "lead", data: null })}>{t.add_lead}</button>

            </>}

            {tab === "projects" && <button className="btn btn-primary btn-sm" onClick={() => setModal({ type: "project", data: null })}>{t.new_project}</button>}

            {tab === "partners" && <button className="btn btn-primary btn-sm" onClick={() => setModal({ type: "partner", data: null })}>{t.add_partner}</button>}

            {tab === "software" && <button className="btn btn-primary btn-sm" onClick={() => setAddingSw(true)}>{t.sw_add}</button>}

            {tab === "content" && <button className="btn btn-primary btn-sm" onClick={() => setModal({ type: "content", data: null })}>{t.new_post}</button>}

            {tab === "jobs" && <button className="btn btn-primary btn-sm" onClick={() => setModal({ type: "job", data: null })}>{t.add_application}</button>}

          </div>

        </div>



        <div className="content">



          {/* PIPELINE */}

          {tab === "pipeline" && <>

            <div className="stats-row">

              <div className="stat-card"><div className="stat-label">{t.total_leads}</div><div className="stat-value">{stats.total}</div><div className="stat-sub">{t.in_funnel}</div></div>

              <div className="stat-card"><div className="stat-label">{t.meetings}</div><div className="stat-value">{stats.meetings}</div><div className="stat-sub">{t.sched_above}</div></div>

              <div className="stat-card"><div className="stat-label">{t.won}</div><div className="stat-value" style={{ color: "var(--won)" }}>{stats.won}</div><div className="stat-sub">{t.closed_clients}</div></div>

              <div className="stat-card"><div className="stat-label">{t.followups_due}</div><div className="stat-value" style={{ color: overdue.length ? "var(--danger)" : "var(--accent)" }}>{overdue.length}</div><div className="stat-sub">{t.overdue}</div></div>

            </div>

            {overdue.length > 0 && (

              <div className="alert-bar"><span className="alert-icon">⚡</span>

                <span><strong style={{ color: "var(--accent)" }}>{overdue.length} follow-up{overdue.length > 1 ? "s" : ""}</strong> — {overdue.map(l => l.company).join(", ")}</span>

              </div>

            )}

            <div className="filters">

              <button className={`filter-chip${filterStatus === "all" ? " active" : ""}`} onClick={() => setFilterStatus("all")}>{t.all}</button>

              {t.funnel_stages.map((s, i) => <button key={i} className={`filter-chip${filterStatus === String(i) ? " active" : ""}`} onClick={() => setFilterStatus(String(i))}>{s}</button>)}

              <select className="form-select" style={{ width: "auto", marginLeft: "10px", padding: "6px 14px", height: "auto", fontSize: 11, background: "transparent", color: "var(--muted)", borderColor: "var(--border)", borderRadius: "999px", textTransform: "uppercase", fontWeight: 700 }} value={sortOrder} onChange={e => setSortOrder(e.target.value)}>

                <option value="desc">{t.sort_date_desc}</option>

                <option value="asc">{t.sort_date_asc}</option>

              </select>

              <input className="search-input" placeholder={t.search_placeholder} value={search} onChange={e => setSearch(e.target.value)} />

            </div>

            <div className="filters" style={{ marginBottom: 16 }}>

              <span style={{ fontSize: 10, color: "var(--muted)", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>{t.type_label}</span>

              <button className={`filter-chip${filterType === "all" ? " active" : ""}`} onClick={() => setFilterType("all")}>{t.all}</button>

              {allTypes.map((tp, i) => <button key={i} className={`filter-chip${filterType === String(i) ? " active" : ""}`} onClick={() => setFilterType(String(i))}>{tp}</button>)}

            </div>



            {viewMode === "table" ? (

              <div className="table-wrap">

                <table className="table">

                  <thead><tr><th>{t.th_company}</th><th>{t.th_type}</th><th>{t.th_contact}</th><th>{t.th_status}</th><th>{t.th_created_at}</th><th>{t.th_followup}</th><th>{t.th_actions}</th></tr></thead>

                  <tbody>

                    {filteredLeads.length === 0 && <tr><td colSpan={6}><div className="empty"><div className="empty-icon">◎</div>{t.no_leads}</div></td></tr>}

                    {filteredLeads.map(l => (

                      <tr key={l.id} onClick={() => setModal({ type: "lead", data: l })}>

                        <td><strong>{l.company}</strong></td>

                        <td><span className={`badge ${TYPE_BADGE[l.type_key] || 'badge-custom'}`}>{allTypes[l.type_key]}</span></td>

                        <td style={{ fontFamily: "var(--font-mono)", fontSize: 12 }}>{l.contact}</td>

                        <td><span className={`funnel-pill ${STAGE_CLASS[l.status]}`}><span className="status-dot" style={{ background: "currentColor" }}></span>{t.funnel_stages[l.status]}</span></td>

                        <td style={{ fontFamily: "var(--font-mono)", fontSize: 11 }}>{l.createdAt || "—"}</td>

                        <td style={{ fontFamily: "var(--font-mono)", fontSize: 11 }} className={fuClass(l.followUp)}>{l.followUp ? `${l.followUp} (${fuLabel(l.followUp, t)})` : "—"}</td>

                        <td onClick={e => e.stopPropagation()}><button className="btn btn-ghost btn-sm" onClick={() => setModal({ type: "lead", data: l })}>{t.edit}</button></td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            ) : (

              <div className="kanban">

                {t.funnel_stages.map((stage, si) => {

                  const cards = leads.filter(l => l.status === si);

                  return (

                    <div key={si} className="kanban-col">

                      <div className="kanban-col-header"><span>{stage}</span><span className="kanban-count">{cards.length}</span></div>

                      {cards.map(l => (

                        <div key={l.id} className="kanban-card" onClick={() => setModal({ type: "lead", data: l })}>

                          <div className="kanban-card-name">{l.company}</div>

                          <div className="kanban-card-meta">{l.contact}</div>

                          <div className="kanban-card-meta"><span className={`badge ${TYPE_BADGE[l.type_key] || 'badge-custom'}`} style={{ fontSize: 9 }}>{allTypes[l.type_key]}</span></div>

                          {l.createdAt && <div className="kanban-card-meta" style={{ marginTop: 6, color: "var(--muted)" }}>📅 {l.createdAt}</div>}

                          {l.followUp && <div className={`kanban-card-follow ${fuClass(l.followUp)}`}>⏱ {fuLabel(l.followUp, t)}</div>}

                        </div>

                      ))}

                    </div>

                  );

                })}

              </div>

            )}

          </>}



          {/* PROJECTS */}

          {tab === "projects" && <>

            <div className="stats-row stats-grid-3">

              <div className="stat-card"><div className="stat-label">{t.active}</div><div className="stat-value">{projects.filter(p => p.phase < 7).length}</div><div className="stat-sub">{t.in_progress}</div></div>

              <div className="stat-card"><div className="stat-label">{t.invoiced}</div><div className="stat-value" style={{ color: "var(--won)" }}>{projects.filter(p => p.phase === 7).length}</div><div className="stat-sub">{t.completed}</div></div>

              <div className="stat-card"><div className="stat-label">{t.fully_paid}</div><div className="stat-value">{projects.filter(p => p.paid.every(Boolean)).length}</div><div className="stat-sub">{t.done_label}</div></div>

            </div>

            <div className="project-grid">

              {projects.map(p => {

                const totalTasks = PHASE_DATA[lang].reduce((sum, ph) => sum + ph.tasks.length, 0);

                const doneTasks = p.tasks ? p.tasks.length : 0;

                const pct = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;

                return (

                <div key={p.id} className="project-card" onClick={() => setModal({ type: "project", data: p })}>

                  <div className="project-card-header">

                    <div><div className="project-name">{p.name}</div><div className="project-client">{p.client}</div></div>

                    <span className={`funnel-pill ${p.phase === 7 ? "s5" : "s3"}`} style={{ fontSize: 10 }}>{t.project_phases[p.phase]}</span>

                  </div>

                  <div className="phase-label">{t.project_phases[p.phase]}</div>

                  <div className="phase-bar">{t.project_phases.map((_, i) => <div key={i} className={`phase-step${i < p.phase ? " done" : i === p.phase ? " current" : ""}`}></div>)}</div>

                  <div className="progress-bar-bg"><div className="progress-bar-fill" style={{ width: `${pct}%`, background: pct === 100 ? "var(--won)" : "var(--accent)" }}></div></div>

                  <div className="progress-pct" style={{ color: pct === 100 ? "var(--won)" : "var(--accent)" }}>{pct}% {lang === "pt" ? "completo" : "complete"}</div>

                  <div className="payment-checks">

                    {t.payment_labels.map((lbl, i) => (

                      <div key={i} className={`payment-check${p.paid[i] ? " paid" : ""}`} onClick={e => { e.stopPropagation(); togglePaid(p.id, i); }}>

                        <div className={`check-box${p.paid[i] ? " checked" : ""}`}>{p.paid[i] ? "✓" : ""}</div>{lbl}

                      </div>

                    ))}

                  </div>

                  <div className="partner-tag" style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>

                    {p.partner && p.partner !== "—" && <span>⚡ {p.partner}</span>}

                    {partners.filter(pt => pt.projectId === p.id).map(pt => (

                      <span key={`pt-${pt.id}`}>⚡ {pt.company}</span>

                    ))}

                  </div>

                </div>

              )})}

            </div>

          </>}



          {/* PARTNERS */}

          {tab === "partners" && <>

            <div className="stats-row stats-grid-2">

              <div className="stat-card"><div className="stat-label">{t.total_partners}</div><div className="stat-value">{partners.length}</div><div className="stat-sub">{t.active}</div></div>

              <div className="stat-card"><div className="stat-label">{t.onboarded_partners}</div><div className="stat-value" style={{ color: "var(--won)" }}>{partners.filter(p => p.status_key === 3).length}</div><div className="stat-sub">{t.in_progress}</div></div>

            </div>

            <div className="filters">

              <input className="search-input" placeholder={t.search_placeholder} value={search} onChange={e => setSearch(e.target.value)} />

            </div>

            <div className="table-wrap">

              <table className="table">

                <thead><tr><th>{t.th_company}</th><th>{t.th_specialty}</th><th>{t.th_contact}</th><th>Email</th><th>{t.th_status}</th><th>{t.th_actions}</th></tr></thead>

                <tbody>

                  {filteredPartners.length === 0 && <tr><td colSpan={6}><div className="empty"><div className="empty-icon">◎</div>{t.no_leads}</div></td></tr>}

                  {filteredPartners.map(p => {

                    const proj = projects.find(pr => pr.id === p.projectId);

                    return (

                    <tr key={p.id} onClick={() => setModal({ type: "partner", data: p })}>

                      <td>

                        <strong>{p.company}</strong>

                        {proj && <div style={{ fontSize: 10, color: "var(--accent2)", marginTop: 4, fontFamily: "var(--font-mono)" }}>⚡ {proj.name}</div>}

                      </td>

                      <td><span className="badge badge-custom">{p.specialty}</span></td>

                      <td style={{ fontFamily: "var(--font-mono)", fontSize: 12 }}>{p.contact} <span style={{ color: "var(--muted)", fontSize: 10 }}>{p.phone}</span></td>

                      <td style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--accent)" }}>{p.email}</td>

                      <td><span className={`funnel-pill ${STAGE_CLASS[p.status_key === 4 ? 6 : p.status_key]}`}><span className="status-dot" style={{ background: "currentColor" }}></span>{t.partner_statuses[p.status_key]}</span></td>

                      <td onClick={e => e.stopPropagation()}><button className="btn btn-ghost btn-sm" onClick={() => setModal({ type: "partner", data: p })}>{t.edit}</button></td>

                    </tr>

                  )})}

                </tbody>

              </table>

            </div>

          </>}



          {/* SOFTWARE */}

          {tab === "software" && <>

            <div className="stats-row stats-grid-3">

              <div className="stat-card"><div className="stat-label">{t.sw_total}</div><div className="stat-value">{softwareCatalog.length}</div><div className="stat-sub">{t.sw_in_catalog}</div></div>

              <div className="stat-card"><div className="stat-label">{t.sw_in_use}</div><div className="stat-value" style={{ color: "var(--won)" }}>{softwareCatalog.filter(s => getToolUsageCount(s.name) > 0).length}</div><div className="stat-sub">{t.sw_across_projects}</div></div>

              <div className="stat-card"><div className="stat-label">{t.sw_categories}</div><div className="stat-value">{SOFTWARE_CATEGORIES.length}</div><div className="stat-sub">{t.sw_available}</div></div>

            </div>



            <div className="filters" style={{ marginBottom: 16 }}>

              <input className="search-input" placeholder={t.sw_search} value={swSearch} onChange={e => setSwSearch(e.target.value)} />

              <button className={`filter-chip${swFilter === "all" ? " active" : ""}`} onClick={() => setSwFilter("all")}>{t.sw_cat_all}</button>

              {SOFTWARE_CATEGORIES.map(cat => (

                <button key={cat} className={`filter-chip${swFilter === cat ? " active" : ""}`} onClick={() => setSwFilter(swFilter === cat ? "all" : cat)}>{t.sw_cat_labels[cat]}</button>

              ))}

            </div>



            {addingSw && (
              <div className="modal-overlay" onClick={() => { setAddingSw(false); setF(null); }}>
                <div className="modal" onClick={e => e.stopPropagation()}>
                  <div className="modal-title">{f?.id ? t.edit : t.sw_add}</div>
                  <div className="form-group">
                    <label className="form-label">{t.sw_name_ph}</label>
                    <input className="form-input" value={f?.id ? f.name : newSw.name} onChange={e => f?.id ? setF({...f, name: e.target.value}) : setNewSw({...newSw, name: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">{t.sw_categories}</label>
                    <select className="form-select" value={f?.id ? f.category : newSw.category} onChange={e => f?.id ? setF({...f, category: e.target.value}) : setNewSw({...newSw, category: e.target.value})}>
                      {SOFTWARE_CATEGORIES.map(k => <option key={k} value={k}>{t.sw_cat_labels[k]}</option>)}
                    </select>
                  </div>
                  {!f?.id && <div className="form-group"><label className="form-label">Icon</label><input className="form-input" value={newSw.icon} onChange={e => setNewSw(p => ({...p, icon: e.target.value}))} /></div>}
                  <div className="modal-footer">
                    <button className="btn btn-ghost" onClick={() => { setAddingSw(false); setF(null); }}>{t.cancel}</button>
                    <button className="btn btn-primary" onClick={async () => {
                      if (f?.id) {
                        const { data } = await supabase.from('software_catalog').update({ name: f.name, category: f.category }).eq('id', f.id).select().single();
                        if (data) setSoftwareCatalog(prev => prev.map(s => s.id === f.id ? data : s));
                      } else {
                        await addSoftware();
                      }
                      setAddingSw(false); setF(null);
                    }}>{t.save}</button>
                  </div>
                </div>
              </div>
            )}



            <div className="project-grid">

              {softwareCatalog

                .filter(s => swFilter === "all" || s.category === swFilter)

                .filter(s => !swSearch || s.name.toLowerCase().includes(swSearch.toLowerCase()))

                .map(sw => {

                  const toolProjects = projects.filter(p => {
                    if (!p.customTools) return false;
                    return Object.values(p.customTools).some(arr => arr.includes(sw.name));
                  });
                  const usage = toolProjects.length;

                  return (
                    <div key={sw.id} className="project-card" style={{ cursor: "default", position: "relative" }}>
                      <div style={{ position: "absolute", top: 10, right: 10 }}>
                        <button className="btn btn-ghost" style={{ fontSize: 10, padding: "2px 6px", marginRight: 5 }} onClick={() => { setF(sw); setAddingSw(true); }} title={t.edit}>✎</button>
                        <button className="btn btn-ghost" style={{ fontSize: 10, padding: "2px 6px", color: "var(--danger)" }} onClick={() => removeSoftware(sw.id)}>✕</button>
                      </div>

                      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                        <span style={{ fontSize: 28 }}>{sw.icon}</span>
                        <div>
                          <div className="project-name">{sw.name}</div>
                          <span className="phase-tool-tag tool-selected" style={{ fontSize: 9 }}>{t.sw_cat_labels[sw.category]}</span>
                        </div>
                      </div>

                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: 11, fontFamily: "var(--font-mono)", color: usage > 0 ? "var(--won)" : "var(--muted)" }}>
                          {usage > 0 ? `${t.sw_used_in} ${usage} ${t.sw_projects_label}` : t.sw_no_projects}
                        </span>
                        {usage > 0 && (
                          <div style={{ display: "flex", gap: 2 }}>
                            {Array.from({ length: Math.min(usage, 5) }).map((_, i) => <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--won)" }}></div>)}
                            {usage > 5 && <span style={{ fontSize: 9, color: "var(--muted)", fontFamily: "var(--font-mono)" }}>+{usage - 5}</span>}
                          </div>
                        )}
                      </div>

                      {toolProjects.length > 0 && (
                        <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid var(--border)", fontSize: 10, color: "var(--muted)", display: "flex", flexDirection: "column", gap: 6 }}>
                          {toolProjects.map(p => {
                             const usedPhases = Object.entries(p.customTools || {})
                               .filter(([_, arr]) => arr.includes(sw.name))
                               .map(([idx, _]) => t.project_phases[idx] || `Fase ${idx}`);
                             return (
                               <div key={p.id}>
                                 <strong style={{ color: "var(--text)", fontWeight: 500 }}>{p.name}</strong>
                                 <div style={{ color: "var(--muted)", marginTop: 2 }}>{usedPhases.join(" • ")}</div>
                               </div>
                             );
                          })}
                        </div>
                      )}
                    </div>

                  );

                })}

            </div>

          </>}



          {/* VAULT */}

          {tab === "vault" && <>

            {/* Upload / URL Section */}
            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: 20, marginBottom: 24 }}>

              {/* Shared category selector row */}
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "flex-end", marginBottom: 20 }}>
                <div className="form-group" style={{ marginBottom: 0, minWidth: 160 }}>
                  <label className="form-label">{t.vault_category}</label>
                  <select className="form-select" value={vaultCategory} onChange={e => setVaultCategory(e.target.value)}>
                    {VAULT_CATEGORIES.map(cat => <option key={cat} value={cat}>{getCategoryLabel(cat)}</option>)}
                  </select>
                </div>

                {/* Sync Drive Button */}
                <button
                  className="btn btn-ghost btn-sm"
                  style={{
                    fontSize: 12, fontWeight: 600, fontFamily: "var(--font-head)",
                    display: "flex", alignItems: "center", gap: 6,
                    color: vaultSyncing ? "var(--muted)" : "var(--accent)",
                    border: "1px solid var(--border)", padding: "8px 16px",
                    cursor: vaultSyncing ? "wait" : "pointer",
                    transition: "all 0.2s",
                  }}
                  onClick={syncVaultFromDrive}
                  disabled={vaultSyncing}
                >
                  <span style={{ display: "inline-block", animation: vaultSyncing ? "spin 1s linear infinite" : "none" }}>↻</span>
                  {vaultSyncing ? t.vault_syncing : t.vault_sync}
                  {vaultSyncMsg && <span style={{ color: "var(--won)", fontFamily: "var(--font-mono)", fontSize: 10 }}>{vaultSyncMsg}</span>}
                </button>

                <button className="btn btn-ghost btn-sm" style={{ fontSize: 12, fontWeight: 600, fontFamily: "var(--font-head)" }} onClick={() => setModal({ type: 'vault_categories' })}>
                  ✎ {t.vault_manage_categories}
                </button>
              </div>

              {/* Two action areas side by side */}
              <div className="vault-actions">

                {/* File Upload */}
                <div style={{ background: "var(--bg)", border: "1px dashed var(--border)", borderRadius: "var(--radius)", padding: 16, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10, minHeight: 100 }}>
                  <span style={{ fontSize: 24 }}>📁</span>
                  <div style={{ fontSize: 13, fontWeight: 700, fontFamily: "var(--font-head)" }}>{t.vault_upload}</div>
                  <label
                    style={{
                      display: "flex", alignItems: "center", gap: 8, padding: "8px 18px",
                      background: vaultUploading ? "var(--surface)" : "var(--accent)",
                      color: vaultUploading ? "var(--muted)" : "#000",
                      borderRadius: "var(--radius)", cursor: vaultUploading ? "wait" : "pointer",
                      fontWeight: 600, fontSize: 12, fontFamily: "var(--font-head)",
                      transition: "all 0.2s", opacity: vaultUploading ? 0.6 : 1,
                      border: "1px solid transparent",
                    }}
                    onDragOver={e => { e.preventDefault(); e.currentTarget.style.borderColor = "var(--accent)"; }}
                    onDragLeave={e => { e.currentTarget.style.borderColor = "transparent"; }}
                    onDrop={e => { e.preventDefault(); e.currentTarget.style.borderColor = "transparent"; if (e.dataTransfer.files[0]) uploadVaultFile(e.dataTransfer.files[0]); }}
                  >
                    <input type="file" style={{ display: "none" }} onChange={e => { if (e.target.files[0]) uploadVaultFile(e.target.files[0]); e.target.value = ''; }} disabled={vaultUploading} />
                    {vaultUploading ? t.vault_uploading : <>{t.vault_select_file}</>}
                  </label>
                  <span style={{ fontSize: 10, color: "var(--muted)" }}>{t.vault_drop}</span>
                </div>

                {/* URL Input */}
                <div style={{ background: "var(--bg)", border: "1px dashed var(--border)", borderRadius: "var(--radius)", padding: 16, display: "flex", flexDirection: "column", gap: 10 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    <span style={{ fontSize: 24 }}>🔗</span>
                    <div style={{ fontSize: 13, fontWeight: 700, fontFamily: "var(--font-head)" }}>{t.vault_add_url}</div>
                  </div>
                  <input className="form-input" placeholder={t.vault_url_name} value={vaultUrlName} onChange={e => setVaultUrlName(e.target.value)} style={{ fontSize: 12 }} />
                  <input className="form-input" placeholder={t.vault_url_placeholder} value={vaultUrlValue} onChange={e => setVaultUrlValue(e.target.value)} style={{ fontSize: 12 }} onKeyDown={e => { if (e.key === 'Enter') addVaultUrl(); }} />
                  <button
                    className="btn btn-primary btn-sm"
                    style={{ alignSelf: "flex-start", fontSize: 12 }}
                    onClick={addVaultUrl}
                    disabled={!vaultUrlValue.trim() || vaultAddingUrl}
                  >
                    {vaultAddingUrl ? '…' : t.vault_add}
                  </button>
                </div>

              </div>
            </div>

            {/* Category Filters */}
            <div className="filters" style={{ marginBottom: 16 }}>
              <button className={`filter-chip${vaultFilter === "all" ? " active" : ""}`} onClick={() => setVaultFilter("all")}>{t.all}</button>
              {VAULT_CATEGORIES.map(cat => (
                <button key={cat} className={`filter-chip${vaultFilter === cat ? " active" : ""}`} onClick={() => setVaultFilter(cat)}>{getCategoryLabel(cat)}</button>
              ))}
            </div>

            {/* Items Grid (Supabase) */}
            {vaultLoading ? (
              <div className="empty"><div className="empty-icon">◎</div>{t.vault_loading}</div>
            ) : vaultItems.filter(v => vaultFilter === "all" || v.category === vaultFilter).length === 0 ? (
              <div className="empty"><div className="empty-icon">◎</div>{t.vault_no_files}</div>
            ) : (
              <div className="project-grid">
                {vaultItems
                  .filter(v => vaultFilter === "all" || v.category === vaultFilter)
                  .map(item => {
                    const isUrl = item.type === 'url';
                    const ext = isUrl ? 'URL' : (item.tag || item.name?.split('.').pop()?.toUpperCase() || '—');
                    const iconMap = { PDF: '📕', DOCX: '📘', DOC: '📘', XLSX: '📊', XLS: '📊', PPTX: '📙', PPT: '📙', ZIP: '📦', RAR: '📦', PNG: '🖼️', JPG: '🖼️', JPEG: '🖼️', MP4: '🎬', MOV: '🎬', EXR: '🎞️', PSD: '🎨', AI: '🎨', BLEND: '🧊', FBX: '🧊', OBJ: '🧊', USD: '🧊', URL: '🔗' };
                    const icon = iconMap[ext] || (isUrl ? '🔗' : '📄');
                    const sizeKB = item.file_size ? (parseInt(item.file_size) / 1024).toFixed(1) : null;
                    const sizeLabel = sizeKB ? (sizeKB > 1024 ? `${(sizeKB / 1024).toFixed(1)} MB` : `${sizeKB} KB`) : null;
                    const link = item.url || item.drive_link || '';
                    return (
                      <div key={item.id} className="project-card" style={{ cursor: "default", position: "relative" }}>
                        <div style={{ position: "absolute", top: 10, right: 10 }}>
                          <button className="btn btn-ghost" style={{ fontSize: 10, padding: "2px 6px", marginRight: 5 }} onClick={() => setModal({ type: 'vault_item', data: item })} title={t.edit}>✎</button>
                          <button className="btn btn-ghost" style={{ fontSize: 10, padding: "2px 6px", color: "var(--danger)" }} onClick={() => deleteVaultItem(item)} title={t.vault_delete}>✕</button>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                          <span style={{ fontSize: 28 }}>{icon}</span>
                          <div style={{ overflow: "hidden" }}>
                            <div className="project-name" style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: 200 }}>{item.name}</div>
                            <div style={{ display: "flex", gap: 6, alignItems: "center", marginTop: 4 }}>
                              <span className="phase-tool-tag tool-selected" style={{ fontSize: 9 }}>{getCategoryLabel(item.category)}</span>
                              <span style={{ fontSize: 8, padding: "2px 6px", borderRadius: 4, background: isUrl ? "rgba(59,130,246,0.15)" : "rgba(34,197,94,0.15)", color: isUrl ? "#60a5fa" : "#4ade80", fontWeight: 700, fontFamily: "var(--font-mono)" }}>{isUrl ? 'URL' : 'FILE'}</span>
                            </div>
                          </div>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                          <span style={{ fontSize: 10, fontFamily: "var(--font-mono)", color: "var(--muted)" }}>{ext}{sizeLabel ? ` · ${sizeLabel}` : ''}</span>
                          <span style={{ fontSize: 9, fontFamily: "var(--font-mono)", color: "var(--muted)" }}>{item.created_at ? new Date(item.created_at).toLocaleDateString() : ''}</span>
                        </div>
                        {link && (
                          <a href={link} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm" style={{ fontSize: 11, textDecoration: "none", display: "inline-block", textAlign: "center" }}>
                            {t.vault_open} ↗
                          </a>
                        )}
                      </div>
                    );
                  })}
              </div>
            )}


          </>}





          {/* PARTNERS */}
          {tab === "partners" && <>
            <div className="stats-row stats-grid-2">
              <div className="stat-card"><div className="stat-label">{t.total_partners}</div><div className="stat-value">{partners.length}</div></div>
              <div className="stat-card"><div className="stat-label">{t.onboarded_partners}</div><div className="stat-value" style={{ color: "var(--won)" }}>{partners.filter(p => p.status_key === 3).length}</div></div>
            </div>
            <div className="table-wrap">
              <table className="table">
                <thead><tr><th>{t.th_company}</th><th>{t.th_specialty}</th><th>{t.th_contact}</th><th>{t.th_status}</th><th></th></tr></thead>
                <tbody>
                  {partners.length === 0 && <tr><td colSpan={5}><div className="empty"><div className="empty-icon">◎</div>Nenhum parceiro</div></td></tr>}
                  {partners.map(p => (
                    <tr key={p.id} onClick={() => setModal({ type: "partner", data: p })}>
                      <td><strong>{p.company}</strong></td>
                      <td><span className="badge badge-custom">{p.specialty}</span></td>
                      <td style={{ fontFamily: "var(--font-mono)", fontSize: 12 }}>{p.contact}</td>
                      <td><span className="funnel-pill" style={{ background: "rgba(102,102,102,0.15)" }}>{t.partner_statuses[p.status_key]}</span></td>
                      <td onClick={e => e.stopPropagation()}><button className="btn btn-ghost btn-sm" onClick={() => setModal({ type: "partner", data: p })}>{t.edit}</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>}

          {/* CONTENT */}

          {tab === "content" && <>

            <div className="filters" style={{ marginBottom: 20 }}>

              <button className={`filter-chip${filterStatus === "all" ? " active" : ""}`} onClick={() => setFilterStatus("all")}>{t.all}</button>

              {t.post_statuses.map((s, i) => <button key={i} className={`filter-chip${filterStatus === String(i) ? " active" : ""}`} onClick={() => setFilterStatus(filterStatus === String(i) ? "all" : String(i))}>{s}</button>)}

            </div>

            <div className="content-grid">

              {content.filter(c => filterStatus === "all" || c.status_key === parseInt(filterStatus)).map(c => (

                <div key={c.id} className="content-card" onClick={() => setModal({ type: "content", data: c })}>

                  <div className="content-card-top">

                    <span className="content-type">{t.post_types[c.type_key].split(" ")[0]}</span>

                    <span style={{ fontSize: 11, color: STATUS_COLORS[c.status_key], fontFamily: "var(--font-mono)", fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5 }}>● {t.post_statuses[c.status_key]}</span>

                  </div>

                  <div className="content-title">{c.title}</div>

                  <div className="content-body">{c.body}</div>

                  <div className="content-date">{t.post_types[c.type_key]} · {c.date}</div>

                </div>

              ))}

            </div>

          </>}



          {/* JOBS */}

          {tab === "jobs" && <>

            <div className="alert-bar" style={{ borderColor: "rgba(240,200,74,0.3)", background: "rgba(240,200,74,0.05)" }}>

              <span className="alert-icon">🔒</span>

              <span style={{ color: "var(--muted)" }}>{t.planb_alert} <strong style={{ color: "var(--text)" }}>{t.planb_job_title}</strong></span>

            </div>

            <div className="table-wrap">

              <table className="table">

                <thead><tr><th>{t.th_company}</th><th>{t.th_position}</th><th>{t.th_platform}</th><th>{t.th_date}</th><th>{t.th_status}</th><th>{t.th_cv}</th><th></th></tr></thead>

                <tbody>

                  {jobs.length === 0 && <tr><td colSpan={7}><div className="empty"><div className="empty-icon">◎</div>{t.no_apps}</div></td></tr>}

                  {jobs.map(j => (

                    <tr key={j.id} onClick={() => setModal({ type: "job", data: j })}>

                      <td><strong>{j.company}</strong></td>

                      <td style={{ fontFamily: "var(--font-mono)", fontSize: 12 }}>{j.position}</td>

                      <td><span className="badge badge-event">{j.platform}</span></td>

                      <td style={{ fontFamily: "var(--font-mono)", fontSize: 11 }}>{j.date}</td>

                      <td><span className="funnel-pill" style={{ background: "rgba(102,102,102,0.15)", color: "#aaa", fontSize: 11 }}>{t.app_statuses[j.status_key]}</span></td>

                      <td style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--accent2)" }}>{j.cv}</td>

                      <td onClick={e => e.stopPropagation()}><button className="btn btn-ghost btn-sm" onClick={() => setModal({ type: "job", data: j })}>{t.edit}</button></td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </>}

          {/* USERS */}
          {tab === "users" && <>
            {session?.user?.email === 'vfxmiguel@gmail.com' ? (
              <div style={{ maxWidth: 400 }}>
                <CreateUser />
              </div>
            ) : (
              <div style={{ padding: 24 }}>{t.unauthorized || "Unauthorized Access."}</div>
            )}
          </>}

        </div>

      </div>



      {/* MODALS */}

      {modal && (

        <div className="modal-overlay" onClick={() => setModal(null)}>

          <div className={`modal${modal.type === "project" ? " modal-wide" : ""}`} onClick={e => e.stopPropagation()}>

            {modal.type === "lead" && <LeadModal t={t} data={modal.data} allTypes={allTypes} customMessages={customMessages} onSave={saveLead} onDelete={deleteLead} onClose={() => setModal(null)} />}

            {modal.type === "project" && <ProjectModal t={t} lang={lang} data={modal.data} partners={partners} softwareCatalog={softwareCatalog} onSave={saveProject} onClose={() => setModal(null)} />}

            {modal.type === "partner" && <PartnerModal t={t} data={modal.data} projects={projects} onSave={savePartner} onDelete={deletePartner} onClose={() => setModal(null)} />}

            {modal.type === "content" && <ContentModal t={t} data={modal.data} onSave={saveContent} onClose={() => setModal(null)} />}

            {modal.type === "job" && <JobModal t={t} data={modal.data} onSave={saveJob} onClose={() => setModal(null)} />}

            {modal.type === "messages" && <MessagesModal t={t} customMessages={customMessages} setCustomMessages={setCustomMessages} onClose={() => setModal(null)} />}

            {modal.type === "vault_item" && <VaultItemModal t={t} data={modal.data} getCategoryLabel={getCategoryLabel} VAULT_CATEGORIES={VAULT_CATEGORIES} onSave={saveVaultItem} onClose={() => setModal(null)} />}

            {modal.type === "vault_categories" && <VaultCategoriesModal t={t} dbVaultCategories={dbVaultCategories} onReload={reloadVaultCategories} onClose={() => setModal(null)} />}

          </div>

        </div>

      )}

    </div>

  );

}



// ── MODALS ────────────────────────────────────────────────────────────────────

function LeadModal({ t, data, allTypes, customMessages, onSave, onDelete, onClose }) {

  const [f, setF] = useState(data || { company: "", type_key: 0, contact: "", phone: "", email: "", linkedin: "", status: 0, followUp: "", notes: "", createdAt: new Date().toISOString().split("T")[0] });

  const [newType, setNewType] = useState("");

  const [selectedScriptId, setSelectedScriptId] = useState("");

  const [isCustom, setIsCustom] = useState(false);

  const s = (k, v) => setF(p => ({ ...p, [k]: v }));



  const applyScript = () => {

    const script = customMessages.find(m => m.id === parseInt(selectedScriptId));

    if (script) {

      if (f.notes.trim()) {

        s("notes", f.notes + "\n\n--- " + script.title + " ---\n" + script.content);

      } else {

        s("notes", script.content);

      }

      setSelectedScriptId("");

    }

  };



  return <>

    <div className="modal-title">{data ? t.edit_lead : t.new_lead}</div>

    <div className="form-row">

      <div className="form-group"><label className="form-label">{t.lbl_company}</label><input className="form-input" value={f.company} onChange={e => s("company", e.target.value)} /></div>

      <div className="form-group"><label className="form-label">{t.lbl_type}</label>

        {!isCustom ? (

          <select className="form-select" value={f.type_key} onChange={e => {

            if (e.target.value === "custom") setIsCustom(true);

            else s("type_key", parseInt(e.target.value));

          }}>

            {allTypes.map((tp, i) => <option key={i} value={i}>{tp}</option>)}

            <option value="custom">{t.add_custom_type}</option>

          </select>

        ) : (

          <div style={{ display: "flex", gap: 5 }}>

            <input className="form-input" autoFocus placeholder={t.custom_type_placeholder} value={newType} onChange={e => setNewType(e.target.value)} />

            <button className="btn btn-ghost btn-sm" onClick={() => setIsCustom(false)}>✕</button>

          </div>

        )}

      </div>

    </div>

    <div className="form-row">

      <div className="form-group"><label className="form-label">{t.lbl_contact}</label><input className="form-input" value={f.contact} onChange={e => s("contact", e.target.value)} /></div>

      <div className="form-group"><label className="form-label">{t.lbl_phone}</label><input className="form-input" value={f.phone} onChange={e => s("phone", e.target.value)} placeholder="+351 …" /></div>

    </div>

    <div className="form-row">

      <div className="form-group"><label className="form-label">{t.lbl_email}</label><input className="form-input" type="email" value={f.email} onChange={e => s("email", e.target.value)} placeholder="name@company.com" /></div>

      <div className="form-group"><label className="form-label">{t.lbl_linkedin}</label><input className="form-input" value={f.linkedin} onChange={e => s("linkedin", e.target.value)} placeholder="https://linkedin.com/in/…" /></div>

    </div>

    <div className="form-row">

      <div className="form-group"><label className="form-label">{t.lbl_funnel}</label>

        <select className="form-select" value={f.status} onChange={e => s("status", parseInt(e.target.value))}>

          {t.funnel_stages.map((st, i) => <option key={i} value={i}>{st}</option>)}

        </select>

      </div>

      <div className="form-group"><label className="form-label">{t.lbl_created_at}</label><input className="form-input" type="date" value={f.createdAt} onChange={e => s("createdAt", e.target.value)} /></div>

    </div>

    <div className="form-row">

      <div className="form-group"><label className="form-label">{t.lbl_followup}</label><input className="form-input" type="date" value={f.followUp} onChange={e => s("followUp", e.target.value)} /></div>

    </div>

    <div className="form-group">

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>

        <label className="form-label">{t.lbl_notes}</label>

        {customMessages.length > 0 && (

          <div style={{ display: "flex", gap: 5 }}>

            <select className="form-select" style={{ width: "auto", fontSize: 10, padding: "2px 6px" }} value={selectedScriptId} onChange={e => setSelectedScriptId(e.target.value)}>

              <option value="">{t.choose_script}</option>

              {customMessages.map(m => <option key={m.id} value={m.id}>{m.title}</option>)}

            </select>

            <button className="btn btn-ghost" style={{ fontSize: 9, padding: "2px 6px" }} onClick={applyScript} disabled={!selectedScriptId}>{t.apply_script}</button>

          </div>

        )}

      </div>

      <textarea className="form-textarea" value={f.notes} onChange={e => s("notes", e.target.value)} placeholder={t.ph_notes} />

    </div>

    <div className="modal-footer">

      {data && <button className="btn btn-danger btn-sm" onClick={() => onDelete(data.id)}>{t.delete}</button>}

      <button className="btn btn-ghost" onClick={onClose}>{t.cancel}</button>

      <button className="btn btn-primary" onClick={() => onSave(f, isCustom ? newType : null)}>{t.save}</button>

    </div>

  </>;

}



function ProjectModal({ t, lang, data, partners, softwareCatalog, onSave, onClose }) {

  const [f, setF] = useState(() => {

    const base = data || { name: "", client: "", phase: 0, partner: "", assets: "", tasks: [], paid: [false, false, false], phaseNotes: {}, selectedTools: {}, customTools: {} };

    return { ...base, tasks: base.tasks || [], paid: base.paid || [false, false, false], phaseNotes: base.phaseNotes || {}, selectedTools: base.selectedTools || {}, customTools: base.customTools || {} };

  });

  const s = (k, v) => setF(p => ({ ...p, [k]: v }));

  const [openPhases, setOpenPhases] = useState([f.phase]);

  const [addingToolPhase, setAddingToolPhase] = useState(null);

  const [swPickerSearch, setSwPickerSearch] = useState("");



  const toggleTask = (taskId) => {

    if (f.tasks.includes(taskId)) {

      s("tasks", f.tasks.filter(id => id !== taskId));

    } else {

      s("tasks", [...f.tasks, taskId]);

    }

  };



  const togglePhaseOpen = (idx) => {

    setOpenPhases(prev => prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]);

  };



  const setPhaseNote = (phaseIdx, val) => {

    s("phaseNotes", { ...f.phaseNotes, [phaseIdx]: val });

  };



  const toggleTool = (phaseIdx, toolName) => {

    const key = `${phaseIdx}_${toolName}`;

    const current = f.selectedTools || {};

    s("selectedTools", { ...current, [key]: !current[key] });

  };



  const isToolSelected = (phaseIdx, toolName) => {

    const key = `${phaseIdx}_${toolName}`;

    const sel = f.selectedTools || {};

    return sel[key] !== false;

  };



  const addToolFromCatalog = (phaseIdx, toolName) => {

    const current = f.customTools || {};

    const phaseCustom = current[phaseIdx] || [];

    const phaseSuggested = (PHASE_DATA[lang] || PHASE_DATA.en)[phaseIdx]?.tools || [];

    if (!phaseSuggested.includes(toolName) && !phaseCustom.includes(toolName)) {

      s("customTools", { ...current, [phaseIdx]: [...phaseCustom, toolName] });

    }

    setAddingToolPhase(null);

    setSwPickerSearch("");

  };



  const removeCustomTool = (phaseIdx, toolName) => {

    const current = f.customTools || {};

    const phaseCustom = (current[phaseIdx] || []).filter(t => t !== toolName);

    s("customTools", { ...current, [phaseIdx]: phaseCustom });

    const selCurrent = f.selectedTools || {};

    const key = `${phaseIdx}_${toolName}`;

    const { [key]: _, ...rest } = selCurrent;

    s("selectedTools", rest);

  };



  const phases = PHASE_DATA[lang] || PHASE_DATA.en;

  const totalTasks = phases.reduce((sum, ph) => sum + ph.tasks.length, 0);

  const doneTasks = f.tasks.length;

  const overallPct = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;



  return <>

    <div className="modal-title">{data ? t.edit_project : t.new_project_title}</div>

    <div className="form-row">

      <div className="form-group"><label className="form-label">{t.lbl_proj_name}</label><input className="form-input" value={f.name} onChange={e => s("name", e.target.value)} /></div>

      <div className="form-group"><label className="form-label">{t.lbl_client}</label><input className="form-input" value={f.client} onChange={e => s("client", e.target.value)} /></div>

    </div>

    <div className="form-row">

      <div className="form-group"><label className="form-label">{t.lbl_phase}</label>

        <select className="form-select" value={f.phase} onChange={e => { const v = parseInt(e.target.value); s("phase", v); if (!openPhases.includes(v)) setOpenPhases([...openPhases, v]); }}>

          {t.project_phases.map((p, i) => <option key={i} value={i}>{p}</option>)}

        </select>

      </div>

      <div className="form-group">

        <label className="form-label">{t.lbl_partner}</label>

        <input className="form-input" value={f.partner} onChange={e => s("partner", e.target.value)} placeholder={t.ph_partner} />

        {data && partners.filter(pt => pt.projectId === data.id).length > 0 && (

          <div style={{ marginTop: 8, display: "flex", gap: 6, flexWrap: "wrap", fontSize: 10, color: "var(--accent2)", fontFamily: "var(--font-mono)" }}>

            {partners.filter(pt => pt.projectId === data.id).map(pt => (

              <span key={pt.id}>⚡ {pt.company}</span>

            ))}

          </div>

        )}

      </div>

    </div>



    {/* Overall progress */}

    <div style={{ marginBottom: 16 }}>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>

        <span className="form-label" style={{ margin: 0 }}>{lang === "pt" ? "Progresso Global" : "Overall Progress"}</span>

        <span className="progress-pct" style={{ color: overallPct === 100 ? "var(--won)" : "var(--accent)", margin: 0 }}>{overallPct}%</span>

      </div>

      <div className="progress-bar-bg" style={{ marginTop: 0, height: 6 }}><div className="progress-bar-fill" style={{ width: `${overallPct}%`, background: overallPct === 100 ? "var(--won)" : `linear-gradient(90deg, var(--accent), var(--accent2))` }}></div></div>

    </div>



    {/* 8 Phase Accordion */}

    <div style={{ marginBottom: 16 }}>

      {phases.map((phaseData, pi) => {

        const isOpen = openPhases.includes(pi);

        const phaseTasks = phaseData.tasks;

        const phaseTasksDone = phaseTasks.filter((_, ti) => f.tasks.includes(`${pi}_${ti}`)).length;

        const phaseComplete = phaseTasksDone === phaseTasks.length && phaseTasks.length > 0;

        const isCurrent = pi === f.phase;

        const isPast = pi < f.phase;

        return (

          <div key={pi} className={`phase-accordion${isCurrent ? " phase-active" : ""}${phaseComplete ? " phase-completed" : ""}`}>

            <div className="phase-acc-header" onClick={() => togglePhaseOpen(pi)}>

              <div className={`phase-acc-num${phaseComplete ? " num-done" : isCurrent ? " num-current" : ""}`}>{phaseComplete ? "✓" : pi + 1}</div>

              <span className="phase-acc-title" style={{ color: isCurrent ? "var(--accent)" : phaseComplete ? "var(--won)" : "var(--muted)" }}>{t.project_phases[pi]}</span>

              <span className="phase-acc-progress">{phaseTasksDone}/{phaseTasks.length}</span>

              <span className={`phase-acc-arrow${isOpen ? " open" : ""}`}>▼</span>

            </div>

            {isOpen && (

              <div className="phase-acc-body">

                <div className="phase-section-label">{lang === "pt" ? "Tarefas" : "Tasks"}</div>

                  {phaseTasks.map((task, ti) => {

                  const taskLabel = typeof task === 'string' ? task : task.desc;

                  const taskId = `${pi}_${ti}`;

                  const isDone = f.tasks.includes(taskId);

                  return (

                    <div key={taskId} className={`phase-task-row${isDone ? " task-done" : ""}`} onClick={() => toggleTask(taskId)}>

                      <div className={`check-box${isDone ? " checked" : ""}`} style={{ borderRadius: 4, width: 14, height: 14, fontSize: 8, flexShrink: 0 }}>{isDone ? "✓" : ""}</div>

                      <span>{taskLabel}</span>

                    </div>

                  );

                })}



                <div className="phase-section-label">{lang === "pt" ? "Entregáveis" : "Deliverables"}</div>

                <div className="phase-deliv">{phaseData.deliverables}</div>



                <div className="phase-section-label">{lang === "pt" ? "Ferramentas" : "Tools"}</div>

                <div className="phase-tools-row">

                  {(f.customTools[pi] || []).map((tool, idx) => {

                    const sw = (softwareCatalog || []).find(s => s.name === tool);

                    return <span key={`c_${idx}`} className="phase-tool-tag tool-selected" onContextMenu={e => { e.preventDefault(); removeCustomTool(pi, tool); }}>{sw ? `${sw.icon} ` : ""}{tool}</span>;

                  })}

                  <div className="sw-picker">

                    <span className="phase-tool-add" onClick={() => { setAddingToolPhase(addingToolPhase === pi ? null : pi); setSwPickerSearch(""); }}>+</span>

                    {addingToolPhase === pi && (

                      <div className="sw-picker-dropdown">

                        <input className="sw-picker-search" autoFocus placeholder={lang === "pt" ? "Pesquisar software…" : "Search software…"} value={swPickerSearch} onChange={e => setSwPickerSearch(e.target.value)} onKeyDown={e => { if (e.key === "Escape") { setAddingToolPhase(null); setSwPickerSearch(""); } }} />

                        {SOFTWARE_CATEGORIES.map(cat => {

                          const items = (softwareCatalog || []).filter(sw => sw.category === cat && (!swPickerSearch || sw.name.toLowerCase().includes(swPickerSearch.toLowerCase())));

                          if (items.length === 0) return null;

                          const phaseCustom = f.customTools[pi] || [];

                          return <div key={cat}>

                            <div className="sw-picker-cat">{t.sw_cat_labels[cat]}</div>

                            {items.map(sw => {

                              const already = phaseCustom.includes(sw.name);

                              return <div key={sw.id} className={`sw-picker-item${already ? " sw-already" : ""}`} onClick={() => { if (!already) addToolFromCatalog(pi, sw.name); }}><span className="sw-pick-icon">{sw.icon}</span><span>{sw.name}</span>{already && <span style={{ fontSize: 8, color: "var(--muted)", marginLeft: "auto" }}>✓</span>}</div>;

                            })}

                          </div>;

                        })}

                      </div>

                    )}

                  </div>

                </div>



                <div className="phase-rule">⚠ {phaseData.rule}</div>



                <textarea

                  className="phase-note-input"

                  placeholder={lang === "pt" ? "Notas desta fase…" : "Phase notes…"}

                  value={f.phaseNotes[pi] || ""}

                  onChange={e => setPhaseNote(pi, e.target.value)}

                />

              </div>

            )}

          </div>

        );

      })}

    </div>



    <div className="form-group"><label className="form-label">{t.lbl_assets}</label><input className="form-input" value={f.assets} onChange={e => s("assets", e.target.value)} placeholder={t.ph_assets} /></div>

    <div className="modal-footer">

      <button className="btn btn-ghost" onClick={onClose}>{t.cancel}</button>

      <button className="btn btn-primary" onClick={() => onSave(f)}>{t.save}</button>

    </div>

  </>;

}



function ContentModal({ t, data, onSave, onClose }) {

  const [f, setF] = useState(data || { type_key: 0, title: "", body: "", status_key: 0, date: "" });

  const s = (k, v) => setF(p => ({ ...p, [k]: v }));

  return <>

    <div className="modal-title">{data ? t.edit_post : t.new_post_title}</div>

    <div className="form-row">

      <div className="form-group"><label className="form-label">{t.lbl_post_type}</label>

        <select className="form-select" value={f.type_key} onChange={e => s("type_key", parseInt(e.target.value))}>

          {t.post_types.map((tp, i) => <option key={i} value={i}>{tp}</option>)}

        </select>

      </div>

      <div className="form-group"><label className="form-label">{t.lbl_post_status}</label>

        <select className="form-select" value={f.status_key} onChange={e => s("status_key", parseInt(e.target.value))}>

          {t.post_statuses.map((st, i) => <option key={i} value={i}>{st}</option>)}

        </select>

      </div>

    </div>

    <div className="form-group"><label className="form-label">{t.lbl_title}</label><input className="form-input" value={f.title} onChange={e => s("title", e.target.value)} /></div>

    <div className="form-group"><label className="form-label">{t.lbl_body}</label><textarea className="form-textarea" value={f.body} onChange={e => s("body", e.target.value)} /></div>

    <div className="form-group"><label className="form-label">{t.lbl_publish_date}</label><input className="form-input" type="date" value={f.date} onChange={e => s("date", e.target.value)} /></div>

    <div className="modal-footer">

      <button className="btn btn-ghost" onClick={onClose}>{t.cancel}</button>

      <button className="btn btn-primary" onClick={() => onSave(f)}>{t.save}</button>

    </div>

  </>;

}



function PartnerModal({ t, data, projects, onSave, onDelete, onClose }) {

  const [f, setF] = useState(data || { company: "", specialty: "", contact: "", email: "", phone: "", status_key: 0, notes: "", projectId: "" });

  const s = (k, v) => setF(p => ({ ...p, [k]: v }));

  return <>

    <div className="modal-title">{data ? t.edit_partner : t.new_partner}</div>

    <div className="form-row">

      <div className="form-group"><label className="form-label">{t.th_company}</label><input className="form-input" value={f.company} onChange={e => s("company", e.target.value)} /></div>

      <div className="form-group"><label className="form-label">{t.lbl_specialty}</label><input className="form-input" value={f.specialty} onChange={e => s("specialty", e.target.value)} placeholder="Hardware, 3D Print, etc." /></div>

    </div>

    <div className="form-row">

      <div className="form-group"><label className="form-label">{t.th_contact}</label><input className="form-input" value={f.contact} onChange={e => s("contact", e.target.value)} /></div>

      <div className="form-group"><label className="form-label">{t.lbl_phone}</label><input className="form-input" value={f.phone} onChange={e => s("phone", e.target.value)} placeholder="+351 …" /></div>

    </div>

    <div className="form-row">

      <div className="form-group"><label className="form-label">{t.lbl_email}</label><input className="form-input" type="email" value={f.email} onChange={e => s("email", e.target.value)} placeholder="name@company.com" /></div>

      <div className="form-group"><label className="form-label">{t.th_status}</label>

        <select className="form-select" value={f.status_key} onChange={e => s("status_key", parseInt(e.target.value))}>

          {t.partner_statuses.map((st, i) => <option key={i} value={i}>{st}</option>)}

        </select>

      </div>

    </div>

    <div className="form-row">

      <div className="form-group"><label className="form-label">{t.lbl_associated_project}</label>

        <select className="form-select" value={f.projectId} onChange={e => s("projectId", e.target.value ? parseInt(e.target.value) : "")}>

          <option value="">{t.none}</option>

          {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}

        </select>

      </div>

    </div>

    <div className="form-group">

      <label className="form-label">{t.lbl_notes}</label>

      <textarea className="form-textarea" value={f.notes} onChange={e => s("notes", e.target.value)} placeholder={t.ph_notes} />

    </div>

    <div className="modal-footer">

      {data && <button className="btn btn-danger btn-sm" onClick={() => onDelete(data.id)}>{t.delete}</button>}

      <button className="btn btn-ghost" onClick={onClose}>{t.cancel}</button>

      <button className="btn btn-primary" onClick={() => onSave(f)}>{t.save}</button>

    </div>

  </>;

}



function JobModal({ t, data, onSave, onClose }) {

  const [f, setF] = useState(data || { company: "", position: "", platform: "LinkedIn", date: "", status_key: 0, cv: "" });

  const s = (k, v) => setF(p => ({ ...p, [k]: v }));

  return <>

    <div className="modal-title">{data ? t.edit_app : t.new_app}</div>

    <div className="form-row">

      <div className="form-group"><label className="form-label">{t.lbl_company_studio}</label><input className="form-input" value={f.company} onChange={e => s("company", e.target.value)} /></div>

      <div className="form-group"><label className="form-label">{t.lbl_job_pos}</label><input className="form-input" value={f.position} onChange={e => s("position", e.target.value)} /></div>

    </div>

    <div className="form-row">

      <div className="form-group"><label className="form-label">{t.lbl_platform}</label>

        <select className="form-select" value={f.platform} onChange={e => s("platform", e.target.value)}>

          {["ArtStation", "LinkedIn", "Direct", "Other"].map(p => <option key={p}>{p}</option>)}

        </select>

      </div>

      <div className="form-group"><label className="form-label">{t.lbl_app_date}</label><input className="form-input" type="date" value={f.date} onChange={e => s("date", e.target.value)} /></div>

    </div>

    <div className="form-row">

      <div className="form-group"><label className="form-label">{t.lbl_app_status}</label>

        <select className="form-select" value={f.status_key} onChange={e => s("status_key", parseInt(e.target.value))}>

          {t.app_statuses.map((st, i) => <option key={i} value={i}>{st}</option>)}

        </select>

      </div>

      <div className="form-group"><label className="form-label">{t.lbl_cv}</label><input className="form-input" value={f.cv} onChange={e => s("cv", e.target.value)} placeholder={t.ph_cv} /></div>

    </div>

    <div className="modal-footer">

      <button className="btn btn-ghost" onClick={onClose}>{t.cancel}</button>

      <button className="btn btn-primary" onClick={() => onSave(f)}>{t.save}</button>

    </div>

  </>;

}



function MessagesModal({ t, customMessages, setCustomMessages, onClose }) {

  const [editMode, setEditMode] = useState(false);

  const [f, setF] = useState({ id: null, title: "", content: "" });



  const saveMessage = async () => {

    if (!f.title || !f.content) return;

    if (f.id) {

      const { data } = await supabase.from('custom_messages').update({ title: f.title, content: f.content }).eq('id', f.id).select().single();

      if (data) setCustomMessages(customMessages.map(m => m.id === f.id ? data : m));

    } else {

      const { data } = await supabase.from('custom_messages').insert([{ title: f.title, content: f.content }]).select().single();

      if (data) setCustomMessages([...customMessages, data]);

    }

    setEditMode(false);

    setF({ id: null, title: "", content: "" });

  };



  const deleteMessage = async (id) => {

    await supabase.from('custom_messages').delete().eq('id', id);

    setCustomMessages(customMessages.filter(m => m.id !== id));

  };



  return <>

    <div className="modal-title">{t.manage_scripts}</div>

    {editMode ? (

      <div style={{ animation: "fadeIn 200ms ease" }}>

        <div className="form-group">

          <label className="form-label">{t.script_title}</label>

          <input className="form-input" value={f.title} onChange={e => setF({ ...f, title: e.target.value })} autoFocus />

        </div>

        <div className="form-group">

          <label className="form-label">{t.script_content}</label>

          <textarea className="form-textarea" style={{ minHeight: "150px" }} value={f.content} onChange={e => setF({ ...f, content: e.target.value })} />

        </div>

        <div className="modal-footer">

          <button className="btn btn-ghost" onClick={() => setEditMode(false)}>{t.cancel}</button>

          <button className="btn btn-primary" onClick={saveMessage}>{t.save}</button>

        </div>

      </div>

    ) : (

      <div>

        <button className="btn btn-primary btn-sm" style={{ width: "100%", marginBottom: 15 }} onClick={() => { setF({ id: null, title: "", content: "" }); setEditMode(true); }}>

          {t.new_script}

        </button>

        <div className="script-list">

          {customMessages.length === 0 && <div className="empty" style={{ padding: "20px 0" }}>No scripts yet.</div>}

          {customMessages.map(m => (

            <div key={m.id} className="script-item">

              <div className="script-info">

                <div className="script-name">{m.title}</div>

                <div className="script-body">{m.content}</div>

              </div>

              <div style={{ display: "flex", gap: 5 }}>

                <button className="btn btn-ghost btn-sm" style={{ padding: "4px 8px" }} onClick={() => { setF(m); setEditMode(true); }}>✎</button>

                <button className="btn btn-danger btn-sm" style={{ padding: "4px 8px" }} onClick={() => deleteMessage(m.id)}>✕</button>

              </div>

            </div>

          ))}

        </div>

        <div className="modal-footer">

          <button className="btn btn-ghost" onClick={onClose}>Close</button>

        </div>

      </div>

    )}

  </>;

}

function VaultItemModal({ t, data, VAULT_CATEGORIES, getCategoryLabel, onSave, onClose }) {
  const [f, setF] = useState(data);
  const isUrl = f.type === 'url';
  const s = (k, v) => setF(p => ({ ...p, [k]: v }));

  return <>
    <div className="modal-title">{t.vault_edit_item}</div>
    <div className="form-group"><label className="form-label">{t.vault_url_name || "Name"}</label><input className="form-input" value={f.name || ""} onChange={e => s("name", e.target.value)} /></div>
    <div className="form-group"><label className="form-label">{t.vault_category}</label>
      <select className="form-select" value={f.category} onChange={e => s("category", e.target.value)}>
        {VAULT_CATEGORIES.map(c => <option key={c} value={c}>{getCategoryLabel(c)}</option>)}
      </select>
    </div>
    {isUrl && <div className="form-group"><label className="form-label">URL</label><input className="form-input" value={f.url || ""} onChange={e => s("url", e.target.value)} /></div>}
    <div className="modal-footer">
      <button className="btn btn-ghost" onClick={onClose}>{t.cancel}</button>
      <button className="btn btn-primary" onClick={() => onSave(f)}>{t.save}</button>
    </div>
  </>;
}

function VaultCategoriesModal({ t, dbVaultCategories, onReload, onClose }) {
  const [f, setF] = useState({ id: null, key: "", label_en: "", label_pt: "" });
  const [editMode, setEditMode] = useState(false);

  const saveCat = async () => {
    if (!f.key || !f.label_en || !f.label_pt) return;
    if (f.id) {
      await supabase.from('vault_categories').update({ key: f.key, label_en: f.label_en, label_pt: f.label_pt }).eq('id', f.id);
    } else {
      await supabase.from('vault_categories').insert([{ key: f.key, label_en: f.label_en, label_pt: f.label_pt }]);
    }
    await onReload();
    setEditMode(false);
    setF({ id: null, key: "", label_en: "", label_pt: "" });
  };

  const deleteCat = async (id) => {
    await supabase.from('vault_categories').delete().eq('id', id);
    await onReload();
  };

  return <>
    <div className="modal-title">{t.vault_manage_categories}</div>
    {editMode ? (
      <div style={{ animation: "fadeIn 200ms ease" }}>
        <div className="form-group"><label className="form-label">Key ID (e.g. DesignFiles)</label>
          <input className="form-input" value={f.key} onChange={e => setF({...f, key: e.target.value.replace(/\s+/g, '')})} disabled={!!f.id} />
        </div>
        <div className="form-group"><label className="form-label">Label (EN)</label><input className="form-input" value={f.label_en} onChange={e => setF({...f, label_en: e.target.value})} /></div>
        <div className="form-group"><label className="form-label">Label (PT)</label><input className="form-input" value={f.label_pt} onChange={e => setF({...f, label_pt: e.target.value})} /></div>
        <div className="modal-footer">
          <button className="btn btn-ghost" onClick={() => setEditMode(false)}>{t.cancel || "Cancel"}</button>
          <button className="btn btn-primary" onClick={saveCat}>{t.save || "Save"}</button>
        </div>
      </div>
    ) : (
      <div>
        <button className="btn btn-primary btn-sm" style={{ width: "100%", marginBottom: 15 }} onClick={() => { setF({ id: null, key: "", label_en: "", label_pt: "" }); setEditMode(true); }}>
          + New Category
        </button>
        <div className="script-list">
          {dbVaultCategories.map(c => (
            <div key={c.id} className="script-item">
              <div className="script-info">
                <div className="script-name">{c.key}</div>
                <div className="script-body">EN: {c.label_en} | PT: {c.label_pt}</div>
              </div>
              <div style={{ display: "flex", gap: 5 }}>
                <button className="btn btn-ghost btn-sm" style={{ padding: "4px 8px" }} onClick={() => { setF(c); setEditMode(true); }}>✎</button>
                <button className="btn btn-danger btn-sm" style={{ padding: "4px 8px" }} onClick={() => deleteCat(c.id)}>✕</button>
              </div>
            </div>
          ))}
        </div>
        <div className="modal-footer"><button className="btn btn-ghost" onClick={onClose}>{t.cancel || "Close"}</button></div>
      </div>
    )}
  </>;
}

