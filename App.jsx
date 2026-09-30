import React, { useState, useEffect, useRef } from "react";
import {
  Heart, MessageCircle, Share2, Bookmark, Home, Compass, Plus,
  MessageSquare, User, Wallet, Search, Download, Languages, Signal, Wifi, Battery, MoreVertical,
  Play, X, Flame, Send, Image as ImageIcon, Music, Gift, Video, Phone, MapPin, Brain, Mic, Coins, Link2
} from "lucide-react";
import { supabase } from "./supabase";

const C = { bg: "#0A0A0F", red: "#E50914", card: "#1A1A1F", border: "rgba(229,9,20,0.28)", grey: "#888888", yellow: "#FFD700", blue: "#00D4FF", green: "#00FF88", pill: "#2A2A30" };

const VIDEOS = [
  { id:1, user:"dance_queen_ug", caption:"Uganda dance 🔥", sound:"Afro Beat", likes:1240, comments:89, village:"Mukono", grad:"linear-gradient(180deg,#ff0055,#000)", emoji:"💃", url:"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"},
  { id:2, user:"kampala_comedy", caption:"Boda 2k 😂", sound:"Comedy", likes:892, comments:120, village:"Nyenje", grad:"linear-gradient(180deg,#00D4FF,#000)", emoji:"😂", url:"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"},
  { id:3, user:"mukono_food", caption:"Rolex nyama 😋", sound:"Food ASMR", likes:2300, comments:200, village:"Nsambwe", grad:"linear-gradient(180deg,#FFD700,#000)", emoji:"🌯", url:"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"},
  { id:4, user:"snap_queen", caption:"Snap filter 👻 24h", sound:"Snap", likes:3400, comments:310, village:"Bajo", grad:"linear-gradient(180deg,#E50914,#000)", emoji:"👻", url:"https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"},
];

const GIFTS = [
  { n: "Rose", e: "🌹", p: 1000, network:"MTN MoMo" },
  { n: "Love", e: "❤️", p: 5000, network:"Airtel Money" },
  { n: "Diamond", e: "💎", p: 20000, network:"MTN MoMo" },
  { n: "Crown", e: "👑", p: 50000, network:"Airtel Money" },
];

function HomeFeed({ toast }) {
  const [idx, setIdx] = useState(0);
  const [liked, setLiked] = useState({});
  const v = VIDEOS[idx];
  const next = () => { setIdx((p)=>(p+1)%VIDEOS.length) };
  return (
    <div style={{ position:"relative", height:"100%", background: v.grad }}>
      <video key={v.id} src={v.url} autoPlay muted loop playsInline style={{position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", opacity:0.6}} />
      <div style={{position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center", fontSize:90}}>{v.emoji}</div>

      <div style={{position:"absolute", top:0, left:0, right:0, padding:15, background:"linear-gradient(black, transparent)", display:"flex", justifyContent:"space-between"}}>
        <b style={{color:"white"}}>Moja Stream 🔥</b>
        <span style={{background: supabase? C.green : "#ff4444", color:"black", padding:"4px 10px", borderRadius:20, fontSize:12}}>{supabase? "DB OK" : "Demo"}</span>
      </div>

      <div style={{position:"absolute", right:10, bottom:100, display:"flex", flexDirection:"column", gap:18, alignItems:"center"}}>
        <button onClick={()=>setLiked({...liked, [v.id]:!liked[v.id]})} style={{background:"rgba(255,255,255,0.2)", border:"none", width:55, height:55, borderRadius:"50%", cursor:"pointer"}}><Heart size={28} color={liked[v.id]? C.red : "white"} fill={liked[v.id]? C.red : "none"} /></button>
        <button onClick={()=>toast("Comments soon")} style={{background:"rgba(255,255,255,0.2)", border:"none", width:55, height:55, borderRadius:"50%"}}><MessageCircle color="white"/></button>
        <button onClick={next} style={{background:"white", border:"none", width:55, height:55, borderRadius:"50%", fontWeight:800}}>Next</button>
      </div>

      <div style={{position:"absolute", bottom:80, left:15, right:80, color:"white"}}>
        <b>@{v.user} • {v.village}</b><div style={{fontSize:14, marginTop:4}}>{v.caption} #fyp</div>
        <div style={{fontSize:12, marginTop:6, display:"flex", alignItems:"center", gap:4}}><Music size={12}/> {v.sound}</div>
      </div>
    </div>
  );
}

function Chats({ toast }) {
  const [chats] = useState([
    {id:1, name:"kampala_bae", img:"https://i.pravatar.cc/150?img=5", streak:12, last:"📷 Photo"},
    {id:2, name:"dance_queen", img:"https://i.pravatar.cc/150?img=10", streak:45, last:"🎤 Voice"},
  ]);
  return (
    <div style={{padding:14, background:C.bg, height:"100%"}}>
      <h2 style={{color:"white"}}>Chats 💬</h2>
      {chats.map(c=>(
        <div key={c.id} onClick={()=>toast(`Chat with ${c.name} - full chat coming next!`)} style={{background:C.card, padding:12, borderRadius:12, marginTop:10, display:"flex", gap:10, alignItems:"center", cursor:"pointer", border:`1px solid ${C.border}`}}>
          <img src={c.img} style={{width:45, height:45, borderRadius:22}}/>
          <div style={{flex:1}}><div style={{color:"white", fontWeight:700}}>{c.name} 🔥 {c.streak}</div><div style={{color:C.grey, fontSize:12}}>{c.last} • ⏳ 24h disappearing • ✓✓</div></div>
          <Phone size={18} color={C.grey}/>
        </div>
      ))}
      <div style={{marginTop:20, display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:10}}>
        {GIFTS.map(g=>(
          <button key={g.n} onClick={()=>toast(`${g.e} ${g.n} = ${g.p} UGX via ${g.network} - 70% to creator`)} style={{background:C.card, border:`1px solid ${C.border}`, borderRadius:12, padding:10}}>
            <div style={{fontSize:24}}>{g.e}</div><div style={{color:"white", fontSize:11}}>{g.n}</div><div style={{color:C.yellow, fontSize:10}}>{g.p}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [tab, setTab] = useState("home");
  const [toastMsg, setToastMsg] = useState("");
  const toast = (m) => { setToastMsg(m); setTimeout(()=>setToastMsg(""), 2500); };

  return (
    <div style={{ background: C.bg, height:"100vh", width:"100vw", display:"flex", flexDirection:"column", overflow:"hidden", fontFamily:"Inter, sans-serif" }}>
      <div style={{flex:1, position:"relative", overflow:"hidden"}}>
        {tab==="home" && <HomeFeed toast={toast} />}
        {tab==="discover" && <div style={{padding:14, color:"white"}}><h2><Compass style={{display:"inline"}}/> Discover</h2><p style={{color:C.grey}}>Village Map • Mukono 🇺🇬</p><div style={{background:C.card, padding:20, borderRadius:16, marginTop:10, textAlign:"center"}}><MapPin color={C.red}/> <b>Nyenje • Nsambwe • Bajo • Mukono</b></div></div>}
        {tab==="create" && <div style={{height:"100%", background:"linear-gradient(#14141c,#0A0A0F)", display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column", gap:20}}><div style={{fontSize:80}}>🐶</div><button onClick={()=>toast("Recording - Go Live feature next")} style={{width:70, height:70, borderRadius:35, background:C.red, border:"4px solid white"}}/><div style={{color:"white"}}>Create • Go Live</div></div>}
        {tab==="chats" && <Chats toast={toast} />}
        {tab==="profile" && <div style={{padding:14, color:"white"}}><h2><User style={{display:"inline"}}/> Profile</h2><div style={{background:C.card, padding:16, borderRadius:16, marginTop:10}}><div>Wallet: 12,400 MoMo Coins</div><div style={{color:C.grey, fontSize:12, marginTop:6}}>70% benefit to creators • MTN MoMo / Airtel Money</div></div></div>}
      </div>

      <div style={{ display:"flex", justifyContent:"space-around", background:C.card, borderTop:`1px solid ${C.border}`, padding:"8px 0" }}>
        {[
          {k:"home", Icon:Home, l:"Home"},
          {k:"discover", Icon:Compass, l:"Discover"},
          {k:"create", Icon:Plus, l:""},
          {k:"chats", Icon:MessageSquare, l:"Chats"},
          {k:"profile", Icon:User, l:"You"},
        ].map(({k, Icon, l})=>(
          <button key={k} onClick={()=>setTab(k)} style={{background: k==="create"? C.red : "transparent", border:"none", color:"white", display:"flex", flexDirection:"column", alignItems:"center", width: k==="create"? 56: 50, height: k==="create"? 36: 40, borderRadius: k==="create"? 18: 0, justifyContent:"center", cursor:"pointer"}}>
            <Icon size={k==="create"? 24: 22} color={tab===k || k==="create"? "white" : C.grey} />
            {l && <span style={{fontSize:10, marginTop:2, color: tab===k? "white": C.grey}}>{l}</span>}
          </button>
        ))}
      </div>

      {toastMsg && <div style={{position:"absolute", bottom:80, left:"50%", transform:"translateX(-50%)", background:"rgba(0,0,0,0.85)", color:"white", padding:"8px 14px", borderRadius:20, fontSize:13}}>{toastMsg}</div>}

      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');`}</style>
    </div>
  );
      }  
