import React, { useContext, useState } from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { Context } from "../../Context/Context";
const Sidebar = () => {
  const [extend, setextend] = useState(false);
  const { onSent, previousprompt, setrecentprompt ,newChat} = useContext(Context);
  const loadprompt = async(prompt) =>{
    setrecentprompt(prompt)
    await onSent(prompt)
  }
  return (
    <div className="sidebar">
      <div className="top">
        <img
          onClick={() => setextend((previousValue) => !previousValue)}
          src={assets.menu_icon}
          className="menu"
          alt=""
        />
        <div onClick={()=>newChat()} className="newchat">
          <img src={assets.plus_icon} alt="" />
          {extend ? <p>New Chat</p> : null}
        </div>
        {extend ? (
          <div className="recent">
            <p className="recenttitle">Recent</p>
            {previousprompt.map((item, index) => {
              return (
                <div onClick={()=>loadprompt(item)} className="recententry">
                  <img src={assets.message_icon} alt="" />
                  <p>{item.slice(0,18)} ...</p>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
      <div className="bottom">
        <div className="bottomitem recententry">
          <img src={assets.question_icon} alt="" />
          {extend ? <p>Help</p> : null}
        </div>
        <div className="bottomitem recententry">
          <img src={assets.history_icon} alt="" />
          {extend ? <p>Activity</p> : null}
        </div>
        <div className="bottomitem recententry">
          <img src={assets.setting_icon} alt="" />
          {extend ? <p>Settings</p> : null}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
