import { useState } from 'react'
import confetti from "canvas-confetti";

interface Message {
  id: number;
  name: string;
  role: string;
  content: string;
  date: string;
  likes: number;
  initial: string;
  isFeatured?: boolean;
  imageUrl?: string; // 추가
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: 5,
    name: "윤채",
    role: "Frontend 13th",
    content: "멋사의 자랑.\n멋사의 중심.\n멋사의 기둥인\n13기 프론트 최고의 아웃풋 원진 오빠! 생일 축하해요~~!!🎂🎉\n대표님 덕분에 늘 든든합니당ㅎㅎ\n항상 멋사를 위해 애써줘서 고마워요!\n행복 가득한 하루 보내세요",
    date: "2026.02.25",
    likes: 213,
    initial: "유"
  },
  {
    id: 101,
    name: "PHOTO DROP",
    role: "Memory",
    content: "",
    date: "2026.02.25",
    likes: 0,
    initial: "P",
    imageUrl: "/img1.png"
  },
  {
    id: 102,
    name: "PHOTO DROP",
    role: "Memory",
    content: "",
    date: "2026.02.25",
    likes: 0,
    initial: "P",
    imageUrl: "/img2.png"
  },
  {
    id: 6,
    name: "lion1",
    role: "Lion",
    content: "아 뭐라고 쓰지~\n김대표님 생신 축하드립니다.\n당신이 있어, 멋사가 더욱 밝아질 수 있었습니다.\n그대 참 멋진 사람... 주황색은 #FF731D 쓸 사람 쓰기",
    date: "2026.02.25",
    likes: 144,
    initial: "L",
    isFeatured: true
  },
  {
    id: 103,
    name: "PHOTO DROP",
    role: "Memory",
    content: "",
    date: "2026.02.25",
    likes: 0,
    initial: "P",
    isFeatured: true,
    imageUrl: "/img3.png"
  },
  {
    id: 7,
    name: "멋사의 충신",
    role: "Core Member",
    content: "탄일을 경하드리옵니다.\n앞으로도 만수무강 하시기를 기원하옵나이다. 허허허\n성군이신 대표님 덕분에 멋사가 평안히 운영되고 있는 듯 하옵니다.\n앞으로도 함께 정사를 잘 운영하면 좋을 듯 하옵니다.\n다시 한번 경하드리옵니다.\n행복하고 즐거운 탄일이 되시기를 바라고 원하옵나이다.\n\n그럼 이럼 저는 이만~~ 허허",
    date: "2026.02.25",
    likes: 301,
    initial: "충",
    imageUrl: "public/img16.png"
  },
  {
    id: 8,
    name: "멋사 최강 기획자",
    role: "Planner",
    content: "그래 원진아, 벌써 멋사에서 회장 열심히 하는 모습 보기 좋다.\n오늘 생일 축하하고 원진이 멋사 열심히 이끌어 나가보거라.\n나도 올해 멋쟁이 사자처럼 처음 입학해서 열심히 성장중이니 혹시나 다음에 마주치면 해커톤이나 한번 뜨자.",
    date: "2026.02.25",
    likes: 167,
    initial: "기",
    imageUrl: "public/img17.png"
  },
  {
    id: 104,
    name: "PHOTO DROP",
    role: "Memory",
    content: "",
    date: "2026.02.25",
    likes: 0,
    initial: "P",
    imageUrl: "/img4.png"
  },
  {
    id: 9,
    name: "서연",
    role: "Frontend 14th",
    content: "원진킴 생일 축하해여 !!!!\n대표 일 이것저것 한다고 바쁠 텐데 고생이 많습니다....\n멋사를 위해 개인 시간 내가며 챙겨줘서 항상 고마워요 !!\n그리고 프론트 밥고... 이번 학기는 잘 진행되길\n담학기 인컴상 같이 듣는데 멋사 카르텔 ㅋㅋ\n행복한 생일 보내시고 다시 한 번 생일 축하해여!!!~~",
    date: "2026.02.25",
    likes: 256,
    initial: "서"
  },
  {
    id: 105,
    name: "PHOTO DROP",
    role: "Memory",
    content: "",
    date: "2026.02.25",
    likes: 0,
    initial: "P",
    isFeatured: true,
    imageUrl: "/img5.png"
  },
  {
    id: 106,
    name: "PHOTO DROP",
    role: "Memory",
    content: "",
    date: "2026.02.25",
    likes: 0,
    initial: "P",
    imageUrl: "/img6.png"
  },{
    id: 11,
    name: "lion3",
    role: "Lion",
    content: "원진아 우리가 서로의 생일을 축하해준 지 벌써 6년이 되어가는 게 믿기지 않는구나..\n그동안 정말 멋진 친구로 지내며 함께 성장할 수 있어서 감사하다.\n앞으로 남은 학교생활도 같이 힘내보자.\n생일을 진심으로 축하한다!",
    date: "2026.02.25",
    likes: 332,
    initial: "L",
    isFeatured: true
  },
  {
    id: 110,
    name: "PHOTO DROP",
    role: "Memory",
    content: "",
    date: "2026.02.25",
    likes: 0,
    initial: "P",
    imageUrl: "/img10.png"
  },
  {
    id: 12,
    name: "김부대표",
    role: "Lion",
    content: "김대표 !!!! 나 김부대표일세 ㅎㅎ\n항상 멋대를 생각하는 섬세하고 꼼꼼한 너를 보며 많이 배운다.\n너를 파트너로 만나 정말 다행이야 ..\n뭐든 네가 있다고 생각하니 걱정이 없다 !!!!\n앞으로 남은 일정도 힘내서 최고의 케미를 보여주자 ㅎㅎ\n생일 너무 축하하고 곧 만나 ^^",
    date: "2026.02.25",
    likes: 418,
    initial: "김"
  },
  {
    id: 115,
    name: "PHOTO DROP",
    role: "Memory",
    content: "",
    date: "2026.02.25",
    likes: 0,
    initial: "P",
    imageUrl: "/img15.png"
  },
  {
    id: 10,
    name: "lion2",
    role: "Lion",
    content: "대표님, 안나세요 생일 축하드려요 ㅎㅎ 같이 13기로 시작해 14기까지 함께할 수 있어서, 영광이라고 생각합니다.\n어려운 일이 있을 때, 같이 해결해나갈 수 있는 동지가 되어주셔서 늘 감사합니다.\n뭔가 약간 공통점이 많은 듯한 저희 ... 더욱 친해지도록 하고, 앞으로도 좋은 추억 많이 쌓아보도록 해요 ~\nㅎㅎ ^^",
    date: "2026.02.25",
    likes: 189,
    initial: "L",
    isFeatured: true,
    imageUrl: "public/img8.png"
  },
  {
    id: 13,
    name: "홍총무",
    role: "Finance",
    content: "늘 든든한 원진 대표님~ 생일 많이 축하해!!\n지난 2학기 인수인계부터 시작해서 벌써 5달째 되어 가고 있는데, 네 덕분에 놓칠 뻔한 부분들도 잘 챙길 수 있었고 14기 운영이 더욱 수월했던 것 같네.\n아무래도 14기를 원진 대표 빼고는 설명하기 어려워~\n늘 보이지 않는 곳에서도 묵묵히 책임을 다해주어 고맙고 끝까지 힘내보자.\n행복한 생일 되길 바랄게)\n\n- 홍총무 -",
    date: "2026.02.25",
    likes: 276,
    initial: "홍",
    isFeatured: true
  },
  {
    id: 112,
    name: "PHOTO DROP",
    role: "Memory",
    content: "",
    date: "2026.02.25",
    likes: 0,
    initial: "P",
    imageUrl: "/img12.png"
  },
  {
    id: 114,
    name: "PHOTO DROP",
    role: "Memory",
    content: "",
    date: "2026.02.25",
    likes: 0,
    initial: "P",
    imageUrl: "/img14.png"
  },
  {
    id: 14,
    name: "Lion6",
    role: "Lion",
    content: "대표님, 생신축하드려요!!\n항상 14기 멋대를 위해 노력하시고 힘써주셔서 감사합니다~\n앞으로 남은 멋대 일정들 같이 화이팅해봐요ㅎㅎ🥳🥳",
    date: "2026.02.25",
    likes: 152,
    initial: "L"
  },
  {
    id: 15,
    name: "채디",
    role: "14th Member",
    content: "원진오빠 생일 축하해!!\n\n14기들아, 원진으로 시작해 원진으로 마무리하자. 원진 영원하라, 대표로,,\n14기 대표는 원진이기에, 원진으로써, 원진에 의해 멋사가 완성되고, 올 한해는 원진을 위한 한해가 되길 바라 ㅎㅎ\n오빠도 대표가 처음일텐데.. 캡스톤하면서 정신도 없을텐데,,, 고생 많아.. ㅜ\n오빠가 대표를 하니까 더 안정적으로 멋사가 잘 굴러가고 있는 것 같아! 내가 대표상이라잖나. 김대표.\n잘할 줄 알았고 잘 이끌어줘서 고마워 ~ 그리고 조금만 더 고생해줘 ~ㅎ!!\n\n생일 많이많이 축하하고 맛있는거 많이 먹고 행복한 하루 보내~\n항상 응원할게~",
    date: "2026.02.26",
    likes: 247,
    initial: "L"
  },
  {
    id: 16,
    name: "lion7",
    role: "Official Fanclub",
    content: "오늘부로 김원진에 대한 지지를 철회한다.\n오늘부터 지지관계에서 벗어나 김원진과 나는 한몸으로 일체가 된다.\n김원진에 대한 공격은 나에 대한 공격으로 간주한다.\n\n세상에 70억명의 김원진 팬이 있다면, 나는 그들 중 한명일 것이다.\n세상에 1억명의 김원진 팬이 있다면, 나 또한 그들 중 한명일 것이다.\n세상에 천만명의 김원진 팬이 있다면, 나는 여전히 그들 중 한명일 것이다.\n세상에 백 명의 김원진 팬이 있다면, 나는 아직도 그들 중 한명일 것이다.\n세상에 한 명의 김원진 팬이 있다면, 그 사람은 아마도 나일 것이다.\n세상에 단 한 명도 김원진의 팬이 없다면, 나는 그제서야 이 세상에 없는 것이다.\n\n김원진, 나의 사랑.\n김원진, 나의 빛.\n김원진, 나의 어둠.\n김원진, 나의 삶.\n김원진, 나의 기쁨.\n김원진, 나의 슬픔.\n김원진, 나의 고통.\n김원진, 나의 안식.\n김원진, 나의 영혼.\n김원진, 나",
    date: "2026.02.26",
    likes: 701,
    initial: "L",
    isFeatured: true,
    imageUrl: "public/img13.png"
  },
  {
    id: 17,
    name: "하디",
    role: "Core Crew",
    content: "원진대표님 생일 축하드려요~!~!!\n\n바야흐로 3개월전,, 멘토인가 대표할 바에 죽겠다나 뭐라나 ~~ 암것도 안하겠다고 뭐라뭐라 하는 오빠 잡고 같이하자고 했던 때가 얼마 안된거 같은데 !!!\n같이 멋사하면서 대표님으로써 항상 묵묵하게 동아리를 이끌어 나가는 모습이 너무 든든하고 고마워 ~ 진심으로~~\n그리고 시덥잖은 얘기부터 고민들까지 함께 얘기할 수 있는 동료가 곁에 있음에 항상 너무 감사해 !!\n그대는 겉차속따의 남자,, 세상 무심하고 신경 안쓰는것처럼 보이지만 한명한명 모두 신경쓰고 챙기는 모습을 보면서 정말 대표의 덕목을 지니고 있는 사람의 시선과 생각은 다르구나.\n저런 모습 본받아야겠다. 라고 생각함 ㅎㅎ\n대표로써 함께해주어서 항상 감사하고 홀리데이까지 너무너무 수고했고 !!\n조금만 더 파이팅이야 !!!\n생일 진심으로 왕창 축하하고 오늘 하루 대표님의 하루니깐 많이 웃고 행복한 일 가득한 하루 되길 바라 !!!🎶🎉",
    date: "2026.02.26",
    likes: 389,
    initial: "L"
  },
  {
    id: 118,
    name: "PHOTO DROP",
    role: "Memory",
    content: "",
    date: "2026.02.25",
    likes: 999,
    initial: "P",
    imageUrl: "/img18.JPG"
  },
];

function App() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newRole, setNewRole] = useState('');
  const [newContent, setNewContent] = useState('');

  const fireConfetti = () => {
    const duration = 1200;
    const end = Date.now() + duration;
  
    const frame = () => {
      confetti({
        particleCount: 6,
        startVelocity: 35,
        spread: 360,
        ticks: 70,
        origin: {
          x: Math.random(),
          y: Math.random() * 0.3
        }
      });
  
      if (Date.now() < end) requestAnimationFrame(frame);
    };
  
    frame();
  };


  const handleAddMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newContent) return;

    const newMessage: Message = {
      id: Date.now(),
      name: newName,
      role: newRole || 'Lion Member', 
      content: newContent,
      date: new Date().toISOString().split('T')[0].replace(/-/g, '.'),
      likes: 0,
      initial: newName.charAt(0).toUpperCase()
    };

    setMessages([newMessage, ...messages]);
    setNewName('');
    setNewRole('');
    setNewContent('');
    setIsModalOpen(false);
  };

  const handleLike = (id: number) => {
    setMessages(messages.map(msg => 
      msg.id === id ? { ...msg, likes: msg.likes + 1 } : msg
    ));
  };

  return (
    <div className={'dark'}>
      <div className="bg-background-light dark:bg-background-dark text-gray-900 dark:text-gray-100 font-display transition-colors duration-300 min-h-screen">
        {/* Top Marquee */}
        <div className="bg-primary py-1 overflow-hidden select-none border-b border-black/10">
          <div className="marquee font-bold text-[10px] uppercase tracking-tighter text-black">
            BIRTHDAY CELEBRATION BIRTHDAY CELEBRATION BIRTHDAY CELEBRATION BIRTHDAY CELEBRATION BIRTHDAY CELEBRATION BIRTHDAY CELEBRATION BIRTHDAY CELEBRATION BIRTHDAY CELEBRATION BIRTHDAY CELEBRATION BIRTHDAY CELEBRATION BIRTHDAY CELEBRATION BIRTHDAY CELEBRATION BIRTHDAY CELEBRATION BIRTHDAY CELEBRATION
          </div>
        </div>

        {/* Header */}
        <header className="relative pt-16 pb-12 px-4 flex flex-col items-center justify-center text-center overflow-hidden">
          <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none"></div>
          <div className="z-10">
            <div className="flex justify-center mb-4">
            </div>
            <p className="text-primary font-bold tracking-[0.3em] text-sm mb-4 uppercase">Like Lion</p>
            <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter mb-6 flex flex-col md:flex-row gap-4 items-center justify-center">
              <span className="text-gray-900 dark:text-white">HAPPY</span>
              <span className="text-primary drop-shadow-[0_0_10px_rgba(255,115,29,0.5)]">BIRTHDAY</span>
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg md:text-xl font-medium">
              우리들의 Leader, <span className="text-primary">김원진 대표님</span>!
            </p>
          </div>
        </header>

        {/* Code Card Section */}
        <section className="max-w-4xl mx-auto px-4 mb-20">
          <div className="code-card-border bg-white dark:bg-[#1A1A1A] rounded-2xl p-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>
            <div className="flex gap-2 mb-6">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <pre className="font-mono text-sm md:text-lg leading-relaxed overflow-x-auto text-gray-800 dark:text-gray-300">
              <span className="text-purple-500 dark:text-purple-400">while</span> (<span className="text-blue-500">leader</span>.<span className="text-yellow-500">birthday</span> == <span className="text-orange-500">true</span>) {"{"}
                {"\n"}    <span className="text-blue-500">lion</span>.<span className="text-green-500">celebrate</span>();
                {"\n"}    happiness++;
                {"\n"}    stress = <span className="text-primary">"404 Not Found"</span>;
                {"\n"}    success_rate = <span className="text-orange-500">Infinity</span>;
                {"\n"}{"}"}
            </pre>
            <div className="mt-8 flex justify-center">
            <button
              onClick={() => {
                fireConfetti();
              }}
              className="bg-primary hover:bg-orange-600 text-white font-bold py-4 px-10 rounded-full flex items-center gap-2 transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-primary/30"
            >
              <span className="material-icons">rocket_launch</span>
              축하 메시지 배포하기
            </button>
            </div>
          </div>
        </section>

        {/* Messages Grid */}
        <main className="max-w-7xl mx-auto px-4 pb-20">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <span className="material-icons text-primary">forum</span>
              Member Messages
            </h2>
            <div className="text-sm text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800/50 px-4 py-2 rounded-full border border-gray-100 dark:border-gray-800">
              Total <span className="text-primary font-bold">{messages.length}</span> Messages
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {messages.map((msg) => (
              <div 
                key={msg.id}
                className={`group p-6 rounded-xl relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${msg.isFeatured ? 'bg-primary text-white shadow-xl shadow-primary/20 transform rotate-1' : 'bg-white dark:bg-[#1E1E1E] border border-gray-200 dark:border-gray-800 hover:border-primary/50 shadow-sm'}`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shadow-inner ${msg.isFeatured ? 'bg-white/20 text-white' : 'bg-primary/10 text-primary'}`}>
                    {msg.initial}
                  </div>
                  <div>
                    <p className="font-bold text-sm tracking-tight">{msg.name}</p>
                    <p className={`text-[10px] font-medium uppercase tracking-wider ${msg.isFeatured ? 'text-white/80' : 'text-gray-500'}`}>
                      {msg.role}
                    </p>
                  </div>
                </div>

                {/* 이미지 렌더 추가 */}
                {msg.imageUrl && (
                  <div className="mb-4">
                    <img
                      src={msg.imageUrl}
                      alt={`${msg.name} message image`}
                      className={`w-full h-auto object-contain rounded-xl border ${
                        msg.isFeatured ? 'border-white/20' : 'border-gray-200 dark:border-gray-800'
                      }`}
                      loading="lazy"
                    />
                  </div>
                )}

                <p className={`text-sm leading-relaxed mb-6 ${msg.isFeatured ? 'text-white italic font-medium' : 'text-gray-700 dark:text-gray-300'}`}>
                  {msg.isFeatured ? `"${msg.content}"` : msg.content}
                </p>
                <div className={`flex justify-between items-center text-[11px] ${msg.isFeatured ? 'text-white/80' : 'text-gray-400'}`}>
                  <span className="font-mono">{msg.date}</span>
                  {msg.isFeatured ? (
                    <span className="material-icons text-sm animate-pulse">auto_awesome</span>
                  ) : (
                    <button 
                      onClick={() => handleLike(msg.id)}
                      className="flex items-center gap-1 group-hover:text-primary transition-colors cursor-pointer hover:scale-110 active:scale-90"
                    >
                      <span className="material-icons text-xs">favorite</span> {msg.likes}
                    </button>
                  )}
                </div>
              </div>
            ))}

            {/* Add Message Button Card */}
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-gray-100/50 dark:bg-gray-800/20 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-xl flex flex-col items-center justify-center aspect-square gap-3 text-gray-400 hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all group"
            >
              <span className="material-icons text-4xl group-hover:scale-110 transition-transform">add_circle_outline</span>
              <span className="text-xs font-bold uppercase tracking-widest">Write Message</span>
            </button>
            
            {[...Array(3)].map((_, i) => (
              <div key={i} className={`bg-gray-50/30 dark:bg-gray-800/10 border-2 border-dashed border-gray-100 dark:border-gray-800/50 rounded-xl flex items-center justify-center aspect-square ${i === 0 ? 'hidden sm:flex' : i === 1 ? 'hidden lg:flex' : 'hidden xl:flex'}`}></div>
            ))}
          </div>
        </main>

        {/* Footer */}
        <footer className="py-16 px-4 text-center border-t border-gray-100 dark:border-gray-800 bg-white/50 dark:bg-black/20 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-6">
            <div className="flex items-center gap-2 text-primary font-black italic text-xl">
              <span className="material-icons">bolt</span>
              LIKE LION UNIV.
            </div>
            <div className="flex gap-4">
               <a href="#" className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 hover:bg-primary hover:text-white transition-all"><span className="material-icons text-sm">language</span></a>
               <a href="#" className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 hover:bg-primary hover:text-white transition-all"><span className="material-icons text-sm">share</span></a>
            </div>
            <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em]">
              © 2026 Like Lion. Built with Passion and <span className="text-primary font-bold">#FF731D</span>
            </p>
          </div>
        </footer>

        {/* Floating Action Button */}
        <div className="fixed bottom-8 right-8 lg:hidden z-40">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="w-16 h-16 bg-primary text-white rounded-full shadow-2xl flex items-center justify-center transform active:scale-90 transition-all hover:scale-105 hover:rotate-12 shadow-primary/40"
          >
            <span className="material-icons text-3xl">edit</span>
          </button>
        </div>

        {/* Message Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
            <div className="bg-white dark:bg-[#1A1A1A] w-full max-w-md rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-10 duration-500 border border-gray-100 dark:border-gray-800">
              <div className="p-8 border-b border-gray-50 dark:border-gray-800 flex justify-between items-center bg-gray-50/50 dark:bg-gray-800/30">
                <div>
                  <h3 className="text-2xl font-black italic tracking-tight">MESSAGE</h3>
                  <p className="text-[10px] text-primary font-bold uppercase tracking-widest">Deploy your heart</p>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)} 
                  className="w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-600 transition-colors"
                >
                  <span className="material-icons">close</span>
                </button>
              </div>
              <form onSubmit={handleAddMessage} className="p-8 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2">Name</label>
                    <input 
                      type="text" 
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      placeholder="Your Name"
                      className="w-full bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 rounded-xl p-4 text-sm focus:ring-2 focus:ring-primary outline-none transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2">Role</label>
                    <input 
                      type="text" 
                      value={newRole}
                      onChange={(e) => setNewRole(e.target.value)}
                      placeholder="e.g. FE Dev"
                      className="w-full bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 rounded-xl p-4 text-sm focus:ring-2 focus:ring-primary outline-none transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2">Message</label>
                  <textarea 
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    placeholder="Write your birthday message here..."
                    className="w-full bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 rounded-xl p-4 text-sm focus:ring-2 focus:ring-primary outline-none h-40 resize-none transition-all"
                    required
                  ></textarea>
                </div>
                <button 
                  type="submit"
                  className="w-full bg-primary hover:bg-orange-600 text-white font-bold py-5 rounded-2xl transition-all shadow-xl shadow-primary/30 transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2"
                >
                  <span className="material-icons text-xl">send</span>
                  메시지 등록하기
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
