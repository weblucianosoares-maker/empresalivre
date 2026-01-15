import React, { useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Clock,
  BarChart3,
  Lock,
  Briefcase,
  Award,
  ChevronDown,
  Target,
  ShieldAlert,
  Flame,
  Laptop,
  TrendingUp,
  Heart,
  Eye,
  Map,
  Lightbulb,
  ListFilter,
  Check,
  Send,
  Instagram
} from 'lucide-react';

// --- Constants & Types ---

// URL do script do Google Sheets para salvar os dados
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyNXz8LjFGTXwwO-awxya8ybARCM7Kpef9QSI3saz523aa_URSxm4dP5IiEUGHAXcGH/exec";

// URL de agendamento para leads qualificados
const SCHEDULING_URL = "https://cal.com/felipe-guimaraes-u28n6i/sessao-diagnostico-empresarial";

// Imagem alterada para representar liberdade (paisagem vasta/montanha)
const HERO_IMAGE_URL = "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=1920";
const MENTOR_IMAGE_URL = "/felipe-guimaraes.jpg";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

// --- Components ---

const Button: React.FC<{
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  fullWidth?: boolean;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}> = ({ children, className = "", onClick, fullWidth = false, type = "button", disabled = false }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        bg-premium-green hover:bg-premium-greenHover text-black font-bold uppercase tracking-wide
        py-4 px-8 rounded-lg shadow-[0_0_20px_rgba(0,224,85,0.3)] hover:shadow-[0_0_30px_rgba(0,224,85,0.5)]
        transition-all duration-300 transform hover:-translate-y-1 inline-flex items-center justify-center gap-2
        disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
    >
      {children}
    </button>
  );
};

const SectionHeading: React.FC<{
  eyebrow?: string;
  title: string;
  subtitle?: string;
  light?: boolean;
  center?: boolean;
}> = ({ eyebrow, title, subtitle, light = false, center = true }) => {
  return (
    <div className={`mb-12 ${center ? 'text-center' : 'text-left'}`}>
      {eyebrow && (
        <span className="text-premium-gold font-bold tracking-widest text-sm uppercase mb-4 block">
          {eyebrow}
        </span>
      )}
      <h2 className={`text-3xl md:text-5xl font-extrabold mb-6 leading-tight ${light ? 'text-gray-900' : 'text-white'}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-lg md:text-xl max-w-3xl mx-auto leading-relaxed ${light ? 'text-gray-600' : 'text-gray-400'}`}>
          {subtitle}
        </p>
      )}
      {!light && <div className={`h-1 w-24 bg-premium-gold mt-6 ${center ? 'mx-auto' : ''}`} />}
    </div>
  );
};

const PainPoint: React.FC<{ title: string; description: string; icon: React.ReactNode }> = ({ title, description, icon }) => (
  <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col h-full group transform hover:-translate-y-1 border-t-4 border-t-transparent hover:border-t-red-600">
    <div className="mb-6 inline-flex p-4 rounded-2xl bg-red-50 text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors duration-300 w-fit">
      {icon}
    </div>
    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-red-600 transition-colors">{title}</h3>
    <p className="text-gray-600 leading-relaxed text-base">
      {description}
    </p>
  </div>
);

const BenefitItem: React.FC<{ title: string; description: string }> = ({ title, description }) => (
  <div className="flex items-start gap-4 mb-6">
    <div className="shrink-0 mt-1">
      <CheckCircle2 className="w-6 h-6 text-premium-green" />
    </div>
    <div>
      <h4 className="text-lg font-bold text-white mb-1">{title}</h4>
      <p className="text-gray-400">{description}</p>
    </div>
  </div>
);

const ValueCard: React.FC<{ title: string; description: string; icon: React.ReactNode }> = ({ title, description, icon }) => (
  <div className="bg-gray-900/60 p-8 rounded-2xl border border-gray-800 hover:border-premium-green/50 transition-all duration-300 group flex gap-6 items-start">
    <div className="shrink-0 p-3 bg-gray-800 rounded-lg text-premium-gold group-hover:text-premium-green group-hover:bg-gray-800 transition-colors">
      {icon}
    </div>
    <div>
      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-premium-green transition-colors">{title}</h3>
      <p className="text-gray-400 text-sm md:text-base leading-relaxed">
        {description}
      </p>
    </div>
  </div>
);

// --- Form Components ---

const InputField: React.FC<{
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  options?: string[];
  required?: boolean;
}> = ({ label, name, type = "text", placeholder, value, onChange, options, required }) => (
  <div className="mb-5 text-left">
    <label className="block text-premium-gold text-sm font-bold mb-2 uppercase tracking-wide">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {options ? (
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full bg-gray-900 text-white border border-gray-700 rounded-lg py-4 px-4 focus:outline-none focus:border-premium-gold focus:ring-1 focus:ring-premium-gold transition-all"
        required={required}
      >
        <option value="" disabled className="text-gray-500">Selecione uma opção</option>
        {options.map(opt => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    ) : type === "textarea" ? (
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-gray-900 text-white border border-gray-700 rounded-lg py-4 px-4 focus:outline-none focus:border-premium-gold focus:ring-1 focus:ring-premium-gold transition-all min-h-[120px]"
        required={required}
      />
    ) : (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-gray-900 text-white border border-gray-700 rounded-lg py-4 px-4 focus:outline-none focus:border-premium-gold focus:ring-1 focus:ring-premium-gold transition-all"
        required={required}
      />
    )}
  </div>
);

const ApplicationForm: React.FC = () => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const initialFormData = {
    name: '',
    email: '',
    phone: '',
    role: '',
    companyName: '',
    employees: '',
    revenue: '',
    challenge: '',
    urgency: ''
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateStep = (currentStep: number) => {
    const missingFields: string[] = [];

    if (currentStep === 1) {
      if (!formData.name) missingFields.push("Nome Completo");
      if (!formData.role) missingFields.push("Cargo");
      if (!formData.email) missingFields.push("Email");
      if (!formData.phone) missingFields.push("WhatsApp");
    }

    if (currentStep === 2) {
      if (!formData.companyName) missingFields.push("Nome da Empresa");
      if (!formData.employees) missingFields.push("Nº de Colaboradores");
      if (!formData.revenue) missingFields.push("Faturamento");
    }

    if (missingFields.length > 0) {
      setErrorMsg(`Por favor, preencha os campos obrigatórios: ${missingFields.join(", ")}`);
      return false;
    }

    return true;
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setErrorMsg('');
      setStep(prev => prev + 1);
    }
  };
  const prevStep = () => {
    setErrorMsg('');
    setStep(prev => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');

    // --- LÓGICA DE ENVIO (Google Sheets) ---
    // Mesmo se for redirecionar depois, precisamos salvar os dados primeiro.

    try {
      if (GOOGLE_SCRIPT_URL) {
        // Usamos mode: 'no-cors' para evitar erros de CORS.
        await fetch(GOOGLE_SCRIPT_URL, {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
      } else {
        // Fallback simulado apenas se não tiver URL configurada
        await new Promise(resolve => setTimeout(resolve, 1500));
      }

      // --- DISPARAR EVENTO DO FACEBOOK PIXEL ---
      // Verificamos se a função 'fbq' existe no window antes de chamar
      if (typeof window !== 'undefined' && (window as any).fbq) {
        (window as any).fbq('track', 'Lead');
      }

      // --- LÓGICA DE QUALIFICAÇÃO (Redirecionamento) ---

      // Critério 1: Faturamento acima de 100k
      // Opções que NÃO qualificam: "Até R$ 50k" e "R$ 50k a R$ 100k"
      const isRevenueQualified =
        formData.revenue !== "Até R$ 50k" &&
        formData.revenue !== "R$ 50k a R$ 100k";

      // Critério 2: Mais de 5 funcionários
      // Opção que NÃO qualifica: "1 - 5"
      const isEmployeesQualified = formData.employees !== "1 - 5";

      if (isRevenueQualified && isEmployeesQualified) {
        // LEAD QUALIFICADO: Redirecionar para o agendamento
        window.location.href = SCHEDULING_URL;
      } else {
        // LEAD NÃO QUALIFICADO (ou erro de lógica): Exibir mensagem de sucesso padrão
        setIsSubmitting(false);
        setIsSuccess(true);
      }

    } catch (error) {
      console.error("Erro ao enviar:", error);
      setErrorMsg("Houve um erro ao enviar sua aplicação. Por favor, tente novamente ou entre em contato pelo WhatsApp.");
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setStep(1);
    setFormData(initialFormData);
    setIsSuccess(false);
    setErrorMsg('');
  };

  if (isSuccess) {
    const handleWhatsAppClick = () => {
      const message = "Eu fiz o agendamento para o Diagnóstico Empresarial, mas quero falar agora sobre a minha empresa com uma especialista!";
      const phone = "5511956949368";
      const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    };

    return (
      <div className="bg-gray-900/90 border border-premium-green rounded-2xl p-10 text-center max-w-2xl mx-auto animate-fade-in">
        <div className="w-20 h-20 bg-premium-green/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-premium-green" />
        </div>
        <h3 className="text-3xl font-bold text-white mb-4">Aplicação Recebida com Sucesso!</h3>
        <p className="text-gray-300 text-lg mb-8">
          Nossa equipe analisará suas respostas. Se o seu perfil for compatível com a Mentoria Empresa Livre, entraremos em contato via WhatsApp nas próximas 24 horas úteis.
        </p>
        <Button onClick={handleWhatsAppClick} className="bg-[#25D366] hover:bg-[#20ba5a] text-white">
          <svg
            viewBox="0 0 24 24"
            className="w-6 h-6 fill-current"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
          Fale com Especialista Agora!
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-700 max-w-3xl mx-auto">
      {/* Progress Bar */}
      <div className="bg-gray-900 p-4 border-b border-gray-700">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Passo {step} de 3</span>
          <span className="text-xs text-premium-gold font-bold">{Math.round(((step - 1) / 3) * 100)}% Completo</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div
            className="bg-premium-green h-2 rounded-full transition-all duration-500 ease-out shadow-[0_0_10px_rgba(0,224,85,0.5)]"
            style={{ width: `${((step - 1) / 3) * 100}%` }}
          ></div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-8 md:p-10">
        {errorMsg && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500 rounded-lg flex items-center gap-3 text-red-200">
            <AlertTriangle className="shrink-0" />
            <p className="text-sm">{errorMsg}</p>
          </div>
        )}

        {step === 1 && (
          <div className="animate-fade-in">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Briefcase className="text-premium-gold" />
              Preencha seus dados aqui:
            </h3>

            <div className="grid md:grid-cols-2 gap-4">
              <InputField
                label="Seu Nome Completo"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Ex: João Silva"
              />
              <InputField
                label="Cargo / Função"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                options={["Sócio / Dono", "CEO / Diretor", "Gerente", "Outro"]}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <InputField
                label="Melhor Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="seuemail@empresa.com"
              />
              <InputField
                label="WhatsApp (com DDD)"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="(11) 99999-9999"
              />
            </div>

            <div className="mt-8 flex justify-end">
              <Button onClick={nextStep} className="w-full md:w-auto">
                Próximo Passo <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-fade-in">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <BarChart3 className="text-premium-gold" />
              Sobre a Empresa:
            </h3>

            <InputField
              label="Nome da Empresa"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              required
              placeholder="Ex: JS Soluções Ltda"
            />

            <div className="grid md:grid-cols-2 gap-4">
              <InputField
                label="Nº de Colaboradores"
                name="employees"
                value={formData.employees}
                onChange={handleChange}
                required
                options={["1 - 5", "6 - 10", "11 - 30", "31 - 50", "Mais de 50"]}
              />
              <InputField
                label="Faturamento Médio Mensal"
                name="revenue"
                value={formData.revenue}
                onChange={handleChange}
                required
                options={[
                  "Até R$ 50k",
                  "R$ 50k a R$ 100k",
                  "R$ 100k a R$ 300k",
                  "R$ 300k a R$ 500k",
                  "Acima de R$ 500k"
                ]}
              />
            </div>

            <div className="mt-8 flex justify-between gap-4">
              <button
                type="button"
                onClick={prevStep}
                className="text-gray-400 hover:text-white font-semibold underline px-4"
              >
                Voltar
              </button>
              <Button onClick={nextStep} className="w-full md:w-auto">
                Próximo Passo <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="animate-fade-in">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Target className="text-premium-gold" />
              Desafio & Urgência
            </h3>

            <InputField
              label="Qual o maior gargalo que impede seu crescimento hoje?"
              name="challenge"
              type="textarea"
              value={formData.challenge}
              onChange={handleChange}
              required
              placeholder="Ex: Não consigo sair do operacional, minha equipe não entrega sem mim, vendas estagnadas..."
            />

            <InputField
              label="Quão urgente é resolver isso para você?"
              name="urgency"
              value={formData.urgency}
              onChange={handleChange}
              required
              options={[
                "Imediata: Preciso resolver isso para ONTEM",
                "Alta: Quero resolver nos próximos 30 dias",
                "Média: Estou planejando para o próximo trimestre",
                "Baixa: Estou apenas pesquisando"
              ]}
            />

            <div className="mt-8 flex justify-between items-center gap-4 flex-col-reverse md:flex-row">
              <button
                type="button"
                onClick={prevStep}
                className="text-gray-400 hover:text-white font-semibold underline px-4"
              >
                Voltar
              </button>
              <Button type="submit" fullWidth disabled={isSubmitting}>
                {isSubmitting ? 'Processando...' : 'FINALIZAR APLICAÇÃO'}
                {!isSubmitting && <Send className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};


// --- Main App Component ---

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToApply = () => {
    const section = document.getElementById('apply-section');
    section?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">

      {/* Sticky Mobile CTA (Visible only on scroll on mobile in a real app, simplified here) */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-premium-dark/90 backdrop-blur-md md:hidden border-t border-gray-800">
        <Button fullWidth onClick={scrollToApply} className="text-sm py-3">
          Quero Agendar Meu Diagnóstico
        </Button>
      </div>

      {/* SEÇÃO 1: HERO */}
      <section className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-60"
          style={{ backgroundImage: `url('${HERO_IMAGE_URL}')` }}
        ></div>
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-premium-dark via-premium-dark/80 to-premium-dark/40"></div>
        <div className="absolute inset-0 z-10 bg-black/40"></div>

        <div className="relative z-20 container mx-auto px-4 pt-20 pb-12 text-center max-w-5xl">
          <div className="inline-block bg-black/50 backdrop-blur-sm border border-premium-gold/30 rounded-full px-6 py-2 mb-6 animate-fade-in-down">
            <span className="text-premium-gold font-bold text-xs md:text-sm tracking-widest uppercase">
              Para empresários com faturamento acima de R$ 100k/mês e mais de 5 funcionários
            </span>
          </div>

          {/* Movimento Empresa Livre Subtitle */}
          <h2 className="text-premium-green font-bold tracking-[0.2em] uppercase text-sm md:text-xl mb-4 drop-shadow-md">
            Movimento Empresa Livre
          </h2>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight tracking-tight drop-shadow-2xl">
            SUA EMPRESA CRESCEU, <br className="hidden md:block" />
            MAS A SUA <span className="text-transparent bg-clip-text bg-gradient-to-r from-premium-gold to-yellow-200">LIBERDADE</span> DESAPARECEU?
          </h1>

          <p className="text-lg md:text-2xl text-gray-200 mb-10 max-w-3xl mx-auto font-light leading-relaxed">
            Não deixe que o seu negócio se torne a sua prisão. Agende um <strong className="text-white">Diagnóstico Empresarial Estratégico</strong> com Felipe Guimarães e receba, em 45 minutos, um Plano de Ação personalizado para sair do operacional.
          </p>

          <div className="flex flex-col items-center gap-4">
            <Button onClick={scrollToApply} className="text-lg md:text-xl py-5 px-10">
              👉 QUERO AGENDAR MEU DIAGNÓSTICO
            </Button>
            <p className="text-gray-400 text-sm flex items-center gap-2">
              <Clock className="w-4 h-4 text-premium-gold" />
              Poucas vagas semanais disponíveis
            </p>
          </div>

          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-gray-500 hidden md:block">
            <ChevronDown className="w-8 h-8" />
          </div>
        </div>
      </section>

      {/* SEÇÃO 2: A IDENTIFICAÇÃO DA DOR */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <SectionHeading
            light
            title="VOCÊ SE RECONHECE EM ALGUM DESTES CENÁRIOS?"
            subtitle="Se você marcou 'sim' em pelo menos dois pontos abaixo, você não tem um negócio. Você tem um emprego de alto risco."
          />

          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <PainPoint
              title='O "Bombeiro de Luxo"'
              icon={<Flame className="w-8 h-8" />}
              description='Você passa o dia apagando incêndios e resolvendo problemas que sua equipe deveria resolver, mas sempre "sobra para você".'
            />
            <PainPoint
              title="Férias com Notebook"
              icon={<Laptop className="w-8 h-8" />}
              description="Você não lembra a última vez que viajou sem ter que responder mensagens ou aprovar pagamentos urgentes. Se você parar, a empresa para."
            />
            <PainPoint
              title="Crescimento Travado"
              icon={<TrendingUp className="w-8 h-8" />}
              description="Você sabe que a empresa tem potencial para dobrar, mas você (o dono) se tornou o maior gargalo. Você não tem braço para crescer mais."
            />
            <PainPoint
              title="Sensação de Culpa"
              icon={<Heart className="w-8 h-8" />}
              description="Você sente que está negligenciando sua família, sua saúde e sua vida pessoal em nome de um negócio que deveria te servir, e não te escravizar."
            />
          </div>

          <div className="mt-12 text-center">
            <Button onClick={scrollToApply}>
              PRECISO SAIR DO OPERACIONAL
            </Button>
          </div>
        </div>
      </section>

      {/* NOVA SEÇÃO: POR QUE DEVO FAZER */}
      <section className="py-24 bg-premium-dark border-t border-gray-900 relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-premium-green/5 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <SectionHeading
            eyebrow="POR QUE EU DEVO FAZER ESSE DIAGNÓSTICO?"
            title="O QUE VOCÊ GANHA AO PARAR POR 45 MINUTOS?"
            center
          />

          <p className="text-xl text-gray-300 max-w-3xl mx-auto text-center mb-16 -mt-8 leading-relaxed">
            Muitos empresários dizem <span className="italic text-white">"não tenho tempo para fazer diagnóstico"</span>.
            A verdade é que você não tem tempo justamente porque nunca parou para fazer um.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <ValueCard
              title="Visão de Raio-X do Negócio"
              icon={<Eye className="w-8 h-8" />}
              description='Vamos tirar você do "olho do furacão" operacional e te dar uma visão panorâmica de onde sua empresa está travada. Você vai enxergar o que a rotina te impede de ver.'
            />
            <ValueCard
              title="Priorização Inteligente"
              icon={<ListFilter className="w-8 h-8" />}
              description='Você provavelmente tem 50 problemas para resolver hoje. Nesta reunião, vamos identificar os 3 únicos problemas que, se resolvidos, eliminam os outros 47.'
            />
            <ValueCard
              title="O Mapa da Liberdade"
              icon={<Map className="w-8 h-8" />}
              description='Um desenho claro do caminho entre o "Caos Atual" e a "Empresa Livre". Você sairá sabendo exatamente qual é o próximo passo lógico, sem "achismos".'
            />
            <ValueCard
              title="Validação Executiva"
              icon={<Lightbulb className="w-8 h-8" />}
              description='A segurança de ter sua gestão analisada por um mentor com mais de 20 anos de experiência executiva, e não por teóricos de internet.'
            />
          </div>

          <div className="mt-12 text-center">
            <Button onClick={scrollToApply}>
              QUERO AGENDAR MEU DIAGNÓSTICO
            </Button>
          </div>
        </div>
      </section>

      {/* SEÇÃO 3: A SOLUÇÃO */}
      <section className="py-24 bg-premium-dark border-t border-gray-900 relative">
        <div className="container mx-auto px-4 max-w-5xl">
          <SectionHeading
            eyebrow="O PRÓXIMO NÍVEL"
            title="NÃO É SOBRE TRABALHAR MAIS. É SOBRE TER UM PLANO."
            subtitle="Para sair dessa armadilha, você não precisa de 'dicas genéricas' de internet. Você precisa da visão cirúrgica de quem já esteve do outro lado."
          />

          <div className="grid md:grid-cols-3 gap-8 mt-16 text-center">
            <div className="bg-gray-900/50 p-8 rounded-2xl border border-gray-800 hover:border-premium-gold/50 transition-colors group">
              <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-premium-gold transition-colors">
                <Lock className="w-8 h-8 text-premium-gold group-hover:text-black" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Mapeamento da Prisão</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Vamos identificar exatamente onde estão os gargalos invisíveis que drenam seu tempo e dinheiro.
              </p>
            </div>

            <div className="bg-gray-900/50 p-8 rounded-2xl border border-gray-800 hover:border-premium-gold/50 transition-colors group">
              <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-premium-gold transition-colors">
                <BarChart3 className="w-8 h-8 text-premium-gold group-hover:text-black" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Análise de Maturidade</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Em qual estágio real sua gestão está? Descubra se você está no nível Operacional, Tático ou Estratégico.
              </p>
            </div>

            <div className="bg-gray-900/50 p-8 rounded-2xl border border-gray-800 hover:border-premium-gold/50 transition-colors group">
              <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-premium-gold transition-colors">
                <Target className="w-8 h-8 text-premium-gold group-hover:text-black" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">O Plano de Fuga</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Você sairá da reunião com um Plano de Ação Prático desenhado especificamente para o seu momento atual.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Button onClick={scrollToApply}>Quero Meu Plano de Fuga</Button>
          </div>
        </div>
      </section>

      {/* SEÇÃO 4: AUTORIDADE */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-black overflow-hidden">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <div className="flex flex-col md:flex-row items-center gap-12 mb-12">
            <div className="w-full md:w-1/2 flex justify-center">
              <div className="relative">
                <div className="absolute -inset-4 bg-premium-gold/20 rounded-2xl blur-xl animate-pulse"></div>
                <img
                  src={MENTOR_IMAGE_URL}
                  alt="Felipe Guimarães"
                  className="relative w-full max-w-sm rounded-2xl shadow-2xl border-2 border-premium-gold/30 object-cover"
                />
              </div>
            </div>
            <div className="w-full md:w-1/2 text-left">
              <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
                QUEM VAI CONDUZIR O SEU DIAGNÓSTICO?
              </h2>
              <p className="text-premium-gold text-lg md:text-xl font-medium mb-6">
                A experiência de grandes corporações, traduzida para a realidade do seu negócio.
              </p>
              <h3 className="text-2xl text-white font-medium mb-4">
                Felipe Guimarães
                <span className="text-gray-500 text-base font-normal block md:inline md:ml-2">
                  | Especialista em Gestão & Estratégia
                </span>
              </h3>
              <div className="space-y-4 text-gray-300 leading-relaxed text-base">
                <p>
                  Felipe Guimarães não é um teórico de palco. Sua bagagem foi construída no campo de batalha de operações bilionárias.
                </p>
                <p>
                  Com passagens estratégicas por gigantes como Itaú, C&A, Suzano e Will Bank, Felipe liderou processos em ambientes de altíssima exigência.
                </p>
                <p>
                  Hoje, como mentor de mais de 1.000 empresários, ele aplica um método próprio para construir empresas fortes que não dependam de donos reféns.
                </p>
              </div>
            </div>
          </div>

          {/* Bullets de Autoridade */}
          <div className="mt-10 grid md:grid-cols-2 gap-6 text-left max-w-3xl mx-auto">
            <div className="bg-gray-800/30 p-4 rounded-lg border border-gray-700">
              <p className="text-gray-300 text-sm md:text-base">
                <span className="text-premium-green font-bold block mb-1">✅ Background de Elite:</span>
                Liderança forjada em multinacionais de escala global.
              </p>
            </div>
            <div className="bg-gray-800/30 p-4 rounded-lg border border-gray-700">
              <p className="text-gray-300 text-sm md:text-base">
                <span className="text-premium-green font-bold block mb-1">✅ Metodologia Validada:</span>
                Criador do método Empresa Livre, aplicado em centenas de nichos diferentes.
              </p>
            </div>
            <div className="bg-gray-800/30 p-4 rounded-lg border border-gray-700">
              <p className="text-gray-300 text-sm md:text-base">
                <span className="text-premium-green font-bold block mb-1">✅ Foco em Liberdade:</span>
                Especialista em tirar o dono do operacional sem derrubar o faturamento.
              </p>
            </div>
            <div className="bg-gray-800/30 p-4 rounded-lg border border-gray-700">
              <p className="text-gray-300 text-sm md:text-base">
                <span className="text-premium-green font-bold block mb-1">✅ Visão Estratégica:</span>
                Une processos, tecnologia e comportamento humano para gerar lucro e leveza.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Button onClick={scrollToApply}>
              QUERO MINHA SESSÃO ESTRATÉGICA
            </Button>
          </div>
        </div>
      </section>

      {/* SEÇÃO 5: BENEFÍCIOS */}
      <section className="py-24 bg-premium-dark relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-800/20 via-transparent to-transparent"></div>
        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <SectionHeading
            title="POR QUE APLICAR PARA ESSE DIAGNÓSTICO?"
            center
          />

          <div className="bg-gray-900 border border-gray-800 p-8 md:p-12 rounded-2xl shadow-2xl">
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
              <BenefitItem
                title="Clareza Imediata"
                description="Saia da neblina e entenda exatamente qual o próximo passo para o seu negócio."
              />
              <BenefitItem
                title="Visão Executiva"
                description="Tenha seu negócio analisado sob a ótica fria e experiente de um executivo sênior."
              />
              <BenefitItem
                title="Economia de Tempo"
                description="Pare de tentar resolver tudo na tentativa e erro. Economize meses de cabeçadas."
              />
              <BenefitItem
                title="Direção Estratégica"
                description="Descubra se a Mentoria Empresa Livre é o veículo ideal para o seu momento de vida."
              />
            </div>
          </div>

          <div className="mt-12 text-center">
            <Button onClick={scrollToApply}>
              APLICAR AGORA
            </Button>
          </div>
        </div>
      </section>

      {/* SEÇÃO FILTRO E FORMULÁRIO (ANTIGO CTA FINAL) */}
      <section id="apply-section" className="py-24 bg-black border-t border-gray-900">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <div className="inline-block p-3 rounded-full bg-red-500/10 mb-6">
            <ShieldAlert className="w-8 h-8 text-red-500" />
          </div>

          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 uppercase">
            AGENDE AGORA O DIAGNÓSTICO
          </h2>

          <p className="text-gray-400 mb-12 text-lg">
            Para garantirmos a qualidade da entrega, aplicamos um filtro rigoroso.
            Preencha a aplicação abaixo para vermos se você se qualifica.
          </p>

          <ApplicationForm />

          <p className="mt-8 text-gray-500 text-sm">
            Garantia: Se não pudermos te ajudar, nós te avisaremos antes da reunião para não desperdiçar seu tempo.
          </p>
        </div>
      </section>

      <footer className="py-8 bg-black border-t border-gray-900 text-center text-gray-600 text-sm">
        <div className="container mx-auto px-4">
          <p>&copy; 2025 Movimento Empresa Livre • Todos os direitos reservados</p>
        </div>
      </footer>
    </div>
  );
};

export default App;