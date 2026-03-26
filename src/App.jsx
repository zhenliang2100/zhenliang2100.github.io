import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { ChevronLeft, MoreVertical, CheckCircle2, Bot, User, Sparkles, X, Activity, Lightbulb, Target, ShieldAlert, MessageSquareText } from 'lucide-react';

export default function App() {
  // 视图状态: 'chat' (聊天列表), 'form' (档案表单页), 'report' (诊断报告页), 'success' (成功页)
  const location = useLocation();
  const [view, setView] = useState(() => {
    // 根据 URL 路径设置初始视图 (在 Hash Router 中，路径信息在 hash 中)
    if (location.hash.includes('/i')) {
      return 'chat'; // 可以根据需要设置特定路径的默认视图
    }
    return 'chat';
  });
  const chatEndRef = useRef(null);

  // 表单状态数据
  const [formData, setFormData] = useState({
    carUser: '', customerBackground: '', isMortgage: '', downPayment: '', 
    easyToCommunicate: '', isLocal: '', carUsage: '', buyBackground: '', 
    addedItems: [], giftItems: [], windowFilmBrand: '', knowsOtherBrands: ''
  });

  // 选项数据字典
  const options = {
    carUser: ['主人本人', '公司户', '代办', '决策者'],
    customerBackground: ['企业老板', '老师', '医生', '建筑', '个体', '自由职业', '其他'],
    yesNo: ['是', '否'],
    downPayment: ['全款', '50%', '零首付'],
    isLocal: ['本地', '外地'],
    carUsage: ['公司车', '家庭用车'],
    buyBackground: ['首购', '增购'],
    addedItems: ['零重力座椅', '轮毂', '内饰', '玻璃'],
    giftItems: ['窗膜', '车衣', '底盘护板', '电动踏板', '小桌板']
  };

  // 滚动到最新消息
  useEffect(() => {
    if (view === 'chat' && chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [view]);

  const handleSingleSelect = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));
  const handleMultiSelect = (field, value) => {
    setFormData(prev => {
      const current = prev[field];
      if (current.includes(value)) {
        if (field === 'giftItems' && value === '窗膜') {
          return { ...prev, [field]: current.filter(item => item !== value), windowFilmBrand: '' };
        }
        return { ...prev, [field]: current.filter(item => item !== value) };
      } else {
        return { ...prev, [field]: [...current, value] };
      }
    });
  };

  const isFormValid = formData.carUser && formData.isMortgage && formData.buyBackground;

  // -------------------------
  // 视图 1: 企微聊天界面
  // -------------------------
  const renderChatView = () => (
    <div className="flex flex-col h-full bg-[#EDEDED] animate-in fade-in duration-300">
      <div className="flex items-center justify-between px-3 py-3 bg-[#EDEDED] border-b border-gray-300 sticky top-0 z-10">
        <div className="flex items-center gap-1">
          <ChevronLeft className="text-gray-800" size={28} />
          <span className="text-gray-800 font-medium text-[17px]">销冠小参谋 - 阿智</span>
        </div>
        <MoreVertical className="text-gray-800" size={24} />
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <div className="text-center text-xs text-gray-400 my-2">昨天 15:30</div>
        
        {/* 历史消息 */}
        <div className="flex gap-3">
          <div className="w-10 h-10 rounded-md bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shrink-0 shadow-sm">
            <Bot className="text-white" size={24} />
          </div>
          <div className="bg-white p-3.5 rounded-lg rounded-tl-none max-w-[80%] shadow-sm text-[15px] text-gray-800 leading-relaxed">
            <p>小张下午好！最新的问界M9话术已经更新到知识库啦，记得抽空看看哦~</p>
          </div>
        </div>

        <div className="text-center text-xs text-gray-400 my-2">10:48</div>

        {/* 触发的新消息 1：档案补充 */}
        <div className="flex gap-3 animate-in slide-in-from-left-4 duration-500 delay-150 fill-mode-both">
          <div className="w-10 h-10 rounded-md bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shrink-0 shadow-sm">
            <Bot className="text-white" size={24} />
          </div>
          <div className="flex flex-col gap-2 max-w-[82%]">
            <div className="bg-white p-3.5 rounded-lg rounded-tl-none shadow-sm text-[15px] text-gray-800 leading-relaxed">
              <p><span className="font-semibold text-blue-600">小张辛苦啦！🎉</span></p>
              <p className="mt-1">检测到你刚才在平板上完成了对 <span className="font-semibold text-gray-900">张总（手机尾号8899）</span> 的轻改业务接待录音。</p>
              <p className="mt-1">为了确保后续跟进更精准，请点击这里 👉 <span onClick={() => setView('form')} className="text-blue-600 font-medium underline underline-offset-2 active:text-blue-800 cursor-pointer">补充张总的轻改档案</span>，完善一下意向信息哦，耗时约1分钟。</p>
            </div>
          </div>
        </div>

        {/* 触发的新消息 2：诊断报告推送 */}
        <div className="flex gap-3 animate-in slide-in-from-left-4 duration-500 delay-500 fill-mode-both">
          <div className="w-10 h-10 rounded-md bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shrink-0 shadow-sm">
            <Bot className="text-white" size={24} />
          </div>
          <div className="flex flex-col gap-2 max-w-[82%]">
            <div className="bg-white p-3.5 rounded-lg rounded-tl-none shadow-sm text-[15px] text-gray-800 leading-relaxed">
              <p><span className="font-semibold text-indigo-600">专属诊断报告已出炉！📊</span></p>
              <p className="mt-1">刚刚这段录音的智能分析也出来啦。你在<span className="text-green-600 font-medium">产品参数对比</span>上表现完美，但在对客户的<span className="text-orange-500 font-medium">需求挖掘和埋点</span>上还能再深入一点哦。</p>
              <p className="mt-1">阿智为你整理了详细的攻防分析与话术建议，点击这里 👉 <span onClick={() => setView('report')} className="text-indigo-600 font-medium underline underline-offset-2 active:text-indigo-800 cursor-pointer">查看接待诊断报告</span> 快速复盘吧！</p>
            </div>
          </div>
        </div>

        <div ref={chatEndRef} />
      </div>

      <div className="bg-[#F7F7F7] border-t border-gray-300 p-3 pb-6 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full border border-gray-400 flex items-center justify-center shrink-0">
          <span className="text-gray-600 text-xl leading-none -mt-1">)</span>
        </div>
        <div className="flex-1 h-10 bg-white rounded-md border border-gray-300"></div>
        <div className="w-8 h-8 rounded-full border border-gray-400 flex items-center justify-center shrink-0">
          <span className="text-gray-600 font-bold text-xl">+</span>
        </div>
      </div>
    </div>
  );

  // -------------------------
  // 视图 2: 诊断报告 H5 页
  // -------------------------
  // 辅助组件：诊断项卡片
  const DiagnosisItem = ({ title, status, proof, advice }) => {
    let statusClass = "text-gray-500 bg-gray-100 border-gray-200";
    if (status.includes('完美')) statusClass = "text-green-600 bg-green-50 border-green-200";
    if (status.includes('缺失')) statusClass = "text-orange-600 bg-orange-50 border-orange-200";
    
    return (
      <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm mb-3">
         <div className="flex justify-between items-start mb-2">
           <span className="text-[14px] font-semibold text-gray-800">{title}</span>
           <span className={`px-2 py-0.5 rounded text-[11px] font-medium border ${statusClass}`}>{status}</span>
         </div>
         <div className="text-[12px] text-gray-500 mb-2 leading-relaxed">
           <span className="font-medium text-gray-400">原文凭证：</span>{proof}
         </div>
         <div className="text-[12px] text-indigo-700 bg-indigo-50/70 p-2 rounded-lg leading-relaxed">
           <span className="font-medium">督导建议：</span>{advice}
         </div>
      </div>
    );
  };

  const renderReportView = () => (
    <div className="flex flex-col h-full bg-[#F3F4F6] animate-in slide-in-from-right duration-300">
      <div className="flex items-center justify-between px-3 py-3 bg-white border-b border-gray-200 shrink-0 sticky top-0 z-20">
        <button onClick={() => setView('chat')} className="p-1 -ml-1 active:bg-gray-100 rounded-md">
          <ChevronLeft className="text-gray-800" size={26} />
        </button>
        <span className="text-gray-800 font-medium text-[17px]">智能诊断报告</span>
        <button onClick={() => setView('chat')} className="p-1 active:bg-gray-100 rounded-md text-gray-500">
          <X size={22} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto pb-10">
        {/* 顶部 Header */}
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-5 pb-16 text-white relative">
          <h2 className="text-[19px] font-bold flex items-center gap-2">
            <Activity size={22} className="text-indigo-100" />
            销售诊断与陪练报告
          </h2>
          <p className="text-indigo-100 text-[12px] mt-1.5 opacity-90">基于您今日接待录音生成的深度复盘与指导</p>
        </div>

        <div className="px-4 -mt-10 space-y-4 relative z-10">
          
          {/* 第一部分：基础档案与洞察 */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1 h-4 bg-indigo-500 rounded-full"></div>
              <h3 className="font-semibold text-gray-800 text-[15px]">基础档案与洞察</h3>
            </div>
            <div className="space-y-3 bg-gray-50 p-3 rounded-lg border border-gray-100">
              <div className="flex gap-2">
                <span className="text-[13px] text-gray-500 w-20 shrink-0">客户信息：</span>
                <span className="text-[13px] text-gray-800 font-medium">客户3（未明确姓名），车型未明确提及</span>
              </div>
              <div className="flex gap-2">
                <span className="text-[13px] text-gray-500 w-20 shrink-0">车主类型：</span>
                <span className="text-[13px] text-indigo-600 font-semibold bg-indigo-50 px-1.5 py-0.5 rounded">B. 理性数据型</span>
              </div>
              <div className="flex gap-2">
                <span className="text-[13px] text-gray-500 w-20 shrink-0">类型偏好：</span>
                <span className="text-[13px] text-gray-800">关注产品参数、材质、质保期限</span>
              </div>
              <div className="flex gap-2">
                <span className="text-[13px] text-gray-500 w-20 shrink-0">核心痛点：</span>
                <span className="text-[13px] text-gray-800">隔热效果不足(10%隔热不够用)、隐私性需求、新车保护、价格性价比</span>
              </div>
            </div>
          </div>

          {/* 第二部分：谈客思路诊断 */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-4 bg-indigo-500 rounded-full"></div>
              <h3 className="font-semibold text-gray-800 text-[15px]">谈客思路诊断对比表</h3>
            </div>
            
            {/* Step 1 */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-gray-800 text-white text-[11px] px-2 py-0.5 rounded-full font-mono">Step 1</span>
                <h4 className="font-medium text-gray-700 text-[14px]">破冰 / 挖掘</h4>
              </div>
              <DiagnosisItem 
                title="挖掘外订详情 (品牌/价格/定金)" status="⬜ 无需执行" 
                proof="无相关对话" advice="客户非外订比价型，无需执行" 
              />
              <DiagnosisItem 
                title="确定需求/共情 (预算/顾虑)" status="⚠️ 关键缺失" 
                proof='"不知道你是哪里人，现在东北东北那边的"(04:38)' 
                advice="Type B客户未深入挖掘具体预算和核心需求，仅简单询问地域" 
              />
            </div>

            {/* Step 2 */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-gray-800 text-white text-[11px] px-2 py-0.5 rounded-full font-mono">Step 2</span>
                <h4 className="font-medium text-gray-700 text-[14px]">建立战线</h4>
              </div>
              <DiagnosisItem 
                title="统一战线 (告知副厂/降抗拒)" status="⬜ 无需执行" 
                proof="无相关对话" advice="客户非外订型，无需此策略" 
              />
              <DiagnosisItem 
                title="多维对比 (售后/背书/施工)" status="✅ 完美执行" 
                proof='"全国联保,因为我们是港股上市,然后全国也有好几十家店"(04:06)' 
                advice="正确展示了上市公司背书和全国联保优势" 
              />
              <DiagnosisItem 
                title="参数/成本分析 (数据/算账)" status="✅ 完美执行" 
                proof='"10%的隔热在广东这边确实是不够用...50%到80%...90%到95%"(03:35)' 
                advice="详细对比了隔热率参数，符合Type B客户需求" 
              />
              <DiagnosisItem 
                title="风险警示 (伤漆/跑路风险)" status="✅ 完美执行" 
                proof='"低价的代价：伤漆/甲醛/售后推诿/无法理赔"(隐含在质保对比中)' 
                advice="通过质保期限对比暗示了低价风险" 
              />
            </div>

            {/* Step 3 */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-gray-800 text-white text-[11px] px-2 py-0.5 rounded-full font-mono">Step 3</span>
                <h4 className="font-medium text-gray-700 text-[14px]">报价 / 展示</h4>
              </div>
              <DiagnosisItem 
                title="双重报价 (原厂+副厂对比)" status="⬜ 无需执行" 
                proof="无相关对话" advice="客户非外订型，无需双重报价" 
              />
              <DiagnosisItem 
                title="专业实力展示 (车间/证书)" status="⚠️ 关键缺失" 
                proof='仅提及"港股上市"，未展示无尘车间、技师认证等硬实力' 
                advice="Type B客户需要更具体的专业资质证明" 
              />
              <DiagnosisItem 
                title="三大承诺 (无伤/效果/质保)" status="✅ 完美执行" 
                proof='"脱胶起泡的话，是免费给你更换的...A4纸这么大一个面免费换"(10:07)' 
                advice="明确给出了施工效果和质保承诺" 
              />
            </div>

            {/* Step 4 */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-gray-800 text-white text-[11px] px-2 py-0.5 rounded-full font-mono">Step 4</span>
                <h4 className="font-medium text-gray-700 text-[14px]">异议 / 逼单</h4>
              </div>
              <DiagnosisItem 
                title="定金挽回 (退定/礼品覆盖)" status="⬜ 无需执行" 
                proof="无相关对话" advice="客户无外订情况，无需执行" 
              />
              <DiagnosisItem 
                title="常规逼单/回归原点" status="✅ 完美执行" 
                proof='"元旦有一个比较低的一个折扣价...之前都是打8折"(07:44)' 
                advice="有效使用限时优惠进行逼单" 
              />
              <DiagnosisItem 
                title="埋点跟进 (加微/发案例)" status="⚠️ 关键缺失" 
                proof="无相关对话" advice="未主动添加微信进行后续跟进" 
              />
            </div>

            {/* 督导总评 */}
            <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-100 flex gap-3 mt-6">
              <Lightbulb className="text-indigo-500 shrink-0 mt-0.5" size={20} />
              <div>
                <h4 className="font-semibold text-indigo-900 text-[14px] mb-1">💡 督导总评</h4>
                <p className="text-[13px] text-indigo-800/80 leading-relaxed">
                  销售正确识别了客户为理性数据型（Type B），在产品参数对比和质保承诺方面表现良好。但存在明显短板：<span className="font-semibold text-indigo-900">未深入挖掘客户具体预算需求，专业实力展示不足</span>（仅提及上市公司背书），且<span className="font-semibold text-indigo-900">未进行微信埋点跟进</span>。最大的失分点在于对Type B客户的核心需求挖掘不够深入。
                </p>
              </div>
            </div>
          </div>

          {/* 第三部分：全系产品开口率 */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-4 bg-indigo-500 rounded-full"></div>
              <h3 className="font-semibold text-gray-800 text-[15px]">产品开口率与关注度分析</h3>
            </div>
            
            <div className="overflow-hidden rounded-lg border border-gray-200">
              <div className="grid grid-cols-12 bg-gray-50 border-b border-gray-200 p-2 text-[11px] font-medium text-gray-500 text-center">
                <div className="col-span-5 text-left pl-2">轻改产品项</div>
                <div className="col-span-3">开口介绍</div>
                <div className="col-span-4">客户兴趣度</div>
              </div>
              
              {[
                { name: '太阳膜', pitch: '🔥重点', interest: '⭐⭐⭐高', isOpen: true },
                { name: '隐形车衣', pitch: '🔥重点', interest: '⭐⭐中', isOpen: true },
                { name: '天窗冰甲', pitch: '💧简单', interest: '⭐低', isOpen: true },
                { name: '脚垫 (360/TPE)', pitch: '🔥重点', interest: '⭐⭐中', isOpen: true },
                { name: '底盘护板', pitch: '⛔未提', interest: '🌑无', isOpen: false },
                { name: '电动踏板', pitch: '⛔未提', interest: '🌑无', isOpen: false },
                { name: '后排小桌板', pitch: '⛔未提', interest: '🌑无', isOpen: false },
              ].map((item, idx) => (
                <div key={idx} className="grid grid-cols-12 border-b last:border-0 border-gray-100 p-2.5 items-center text-[13px]">
                  <div className="col-span-5 flex items-center gap-1.5 pl-1">
                    {item.isOpen ? <CheckCircle2 size={14} className="text-green-500 shrink-0" /> : <div className="w-3.5 h-3.5 rounded-full border border-gray-300 shrink-0 flex items-center justify-center"><div className="w-1.5 h-px bg-gray-300"></div></div>}
                    <span className={`truncate ${item.isOpen ? 'text-gray-800 font-medium' : 'text-gray-400'}`}>{item.name}</span>
                  </div>
                  <div className="col-span-3 text-center">
                    <span className={`text-[12px] ${item.pitch.includes('重点') ? 'text-red-500 font-medium' : item.pitch.includes('简单') ? 'text-blue-500' : 'text-gray-400'}`}>{item.pitch}</span>
                  </div>
                  <div className="col-span-4 text-center text-[11px] text-gray-600">{item.interest}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 第四部分：异议处理攻防分析 */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-4 bg-indigo-500 rounded-full"></div>
              <h3 className="font-semibold text-gray-800 text-[15px]">接待中异议处理攻防分析</h3>
            </div>
            
            <div className="space-y-4">
              {/* Card 1 */}
              <div className="border border-green-200 bg-green-50/30 rounded-lg p-3">
                 <div className="flex items-center gap-2 mb-2">
                   <Target className="text-green-600" size={16} />
                   <span className="font-semibold text-[14px] text-gray-800">隐形车衣材质疑虑</span>
                   <span className="ml-auto text-green-600 bg-green-100 px-1.5 py-0.5 rounded text-[11px] font-medium">✅ 处理得当</span>
                 </div>
                 <div className="text-[12px] text-gray-500 mb-1">
                   <span className="text-gray-400">凭证：</span>"改色膜会有这种情况...TPU材质它很软"(13:16)
                 </div>
                 <div className="text-[12px] text-green-700 mt-1.5">
                   <span className="font-medium">复盘：</span>正确区分了改色膜与隐形车衣的材质差异，消除客户顾虑。
                 </div>
              </div>

              {/* Card 2 */}
              <div className="border border-green-200 bg-green-50/30 rounded-lg p-3">
                 <div className="flex items-center gap-2 mb-2">
                   <Target className="text-green-600" size={16} />
                   <span className="font-semibold text-[14px] text-gray-800">施工时间担忧</span>
                   <span className="ml-auto text-green-600 bg-green-100 px-1.5 py-0.5 rounded text-[11px] font-medium">✅ 处理得当</span>
                 </div>
                 <div className="text-[12px] text-gray-500 mb-1">
                   <span className="text-gray-400">凭证：</span>"今天能做窗模...车衣需要一天"(18:49)
                 </div>
                 <div className="text-[12px] text-green-700 mt-1.5">
                   <span className="font-medium">复盘：</span>清晰说明不同项目施工时长，合理安排时间。
                 </div>
              </div>

              {/* Card 3 */}
              <div className="border border-green-200 bg-green-50/30 rounded-lg p-3">
                 <div className="flex items-center gap-2 mb-2">
                   <Target className="text-green-600" size={16} />
                   <span className="font-semibold text-[14px] text-gray-800">套餐价值质疑</span>
                   <span className="ml-auto text-green-600 bg-green-100 px-1.5 py-0.5 rounded text-[11px] font-medium">✅ 处理得当</span>
                 </div>
                 <div className="text-[12px] text-gray-500 mb-1">
                   <span className="text-gray-400">凭证：</span>"单独贴都要2600...现在3980含全套"(17:25)
                 </div>
                 <div className="text-[12px] text-green-700 mt-1.5">
                   <span className="font-medium">复盘：</span>通过详细的价格对比证明套餐性价比。
                 </div>
              </div>
            </div>

            <div className="mt-5 p-3.5 bg-gray-50 border border-gray-200 rounded-lg text-[13px] text-gray-600 leading-relaxed">
              <span className="font-semibold text-gray-800 block mb-1">📝 最终总结：</span>
              本次接待整体表现良好，销售在产品知识和套餐推销方面较为熟练，但在<span className="text-orange-500 font-medium">客户需求深度挖掘</span>和<span className="text-orange-500 font-medium">专业形象建立方面</span>需要加强改进。
            </div>
          </div>

        </div>
      </div>
    </div>
  );

  // -------------------------
  // 视图 3: 档案补充表单 (不变)
  // -------------------------
  const OptionPills = ({ optionsList, selectedValue, onSelect, isMulti = false }) => (
    <div className="flex flex-wrap gap-2.5 mt-2">
      {optionsList.map(opt => {
        const isSelected = isMulti ? selectedValue.includes(opt) : selectedValue === opt;
        return (
          <button
            key={opt}
            onClick={() => onSelect(opt)}
            className={`px-4 py-1.5 rounded-full text-[13px] transition-all duration-200 border ${
              isSelected 
                ? 'bg-blue-600 text-white border-blue-600 font-medium' 
                : 'bg-gray-50 text-gray-600 border-gray-200 active:bg-gray-100'
            }`}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );

  const renderFormView = () => (
    <div className="flex flex-col h-full bg-[#F3F4F6] animate-in slide-in-from-right duration-300">
      <div className="flex items-center justify-between px-3 py-3 bg-white border-b border-gray-200 shrink-0 sticky top-0 z-20">
        <button onClick={() => setView('chat')} className="p-1 -ml-1 active:bg-gray-100 rounded-md">
          <ChevronLeft className="text-gray-800" size={26} />
        </button>
        <span className="text-gray-800 font-medium text-[17px]">轻改档案补充</span>
        <button onClick={() => setView('chat')} className="p-1 active:bg-gray-100 rounded-md text-gray-500">
          <X size={22} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto pb-24">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-5 pb-8 text-white rounded-b-2xl shadow-sm relative">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Sparkles size={20} className="text-blue-100" />
            完善轻改客户档案
          </h2>
          <p className="text-blue-100 text-xs mt-1.5 opacity-90 mb-4">请根据刚刚的接待情况，补全以下信息</p>
          
          <div className="bg-white/15 border border-white/20 rounded-xl p-3 flex flex-col gap-3 backdrop-blur-sm">
            <div className="border-b border-white/10 pb-2">
              <div className="text-[11px] text-blue-100 mb-1">客户姓名 / 企业名称</div>
              <div className="text-[14px] font-medium flex items-center gap-1.5">
                <User size={14} className="opacity-80 shrink-0" /> 
                <span className="truncate">深圳市广联数科科技有限公司</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between px-1">
              <div>
                <div className="text-[11px] text-blue-100 mb-0.5">手机号码</div>
                <div className="text-[13px] font-medium font-mono">138****8899</div>
              </div>
              <div className="w-px h-6 bg-white/20"></div>
              <div>
                <div className="text-[11px] text-blue-100 mb-0.5">交车车型</div>
                <div className="text-[13px] font-medium">问界 M9</div>
              </div>
              <div className="w-px h-6 bg-white/20"></div>
              <div>
                <div className="text-[11px] text-blue-100 mb-0.5">接待时间</div>
                <div className="text-[13px] font-medium font-mono">10:45:30</div>
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 -mt-4 space-y-4 relative z-10">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-4 bg-blue-600 rounded-full"></div>
              <h3 className="font-semibold text-gray-800 text-[15px]">客户画像</h3>
            </div>
            <div className="space-y-5">
              <div>
                <label className="text-sm text-gray-600 font-medium">用车人 <span className="text-red-500">*</span></label>
                <OptionPills optionsList={options.carUser} selectedValue={formData.carUser} onSelect={(v) => handleSingleSelect('carUser', v)} />
              </div>
              <div>
                <label className="text-sm text-gray-600 font-medium">客户背景</label>
                <OptionPills optionsList={options.customerBackground} selectedValue={formData.customerBackground} onSelect={(v) => handleSingleSelect('customerBackground', v)} />
              </div>
              <div>
                <label className="text-sm text-gray-600 font-medium">是否好沟通</label>
                <OptionPills optionsList={options.yesNo} selectedValue={formData.easyToCommunicate} onSelect={(v) => handleSingleSelect('easyToCommunicate', v)} />
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-4 bg-blue-600 rounded-full"></div>
              <h3 className="font-semibold text-gray-800 text-[15px]">购车基础信息</h3>
            </div>
            <div className="space-y-5">
              <div>
                <label className="text-sm text-gray-600 font-medium">是否按揭 <span className="text-red-500">*</span></label>
                <OptionPills optionsList={options.yesNo} selectedValue={formData.isMortgage} onSelect={(v) => handleSingleSelect('isMortgage', v)} />
              </div>
              <div>
                <label className="text-sm text-gray-600 font-medium">首付比例</label>
                <OptionPills optionsList={options.downPayment} selectedValue={formData.downPayment} onSelect={(v) => handleSingleSelect('downPayment', v)} />
              </div>
              <div>
                <label className="text-sm text-gray-600 font-medium">购车背景 <span className="text-red-500">*</span></label>
                <OptionPills optionsList={options.buyBackground} selectedValue={formData.buyBackground} onSelect={(v) => handleSingleSelect('buyBackground', v)} />
              </div>
              <div>
                <label className="text-sm text-gray-600 font-medium">是否本地用车</label>
                <OptionPills optionsList={options.isLocal} selectedValue={formData.isLocal} onSelect={(v) => handleSingleSelect('isLocal', v)} />
              </div>
              <div>
                <label className="text-sm text-gray-600 font-medium">购车用途</label>
                <OptionPills optionsList={options.carUsage} selectedValue={formData.carUsage} onSelect={(v) => handleSingleSelect('carUsage', v)} />
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-4 bg-blue-600 rounded-full"></div>
              <h3 className="font-semibold text-gray-800 text-[15px]">轻改精品意向</h3>
            </div>
            <div className="space-y-5">
              <div>
                <label className="text-sm text-gray-600 font-medium">购车时加装项目 <span className="text-xs text-gray-400 font-normal ml-1">(多选)</span></label>
                <OptionPills optionsList={options.addedItems} selectedValue={formData.addedItems} onSelect={(v) => handleMultiSelect('addedItems', v)} isMulti={true} />
              </div>
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                <label className="text-sm text-gray-700 font-medium block mb-2">赠送精品项目 <span className="text-xs text-gray-400 font-normal ml-1">(多选)</span></label>
                <OptionPills optionsList={options.giftItems} selectedValue={formData.giftItems} onSelect={(v) => handleMultiSelect('giftItems', v)} isMulti={true} />
                {formData.giftItems.includes('窗膜') && (
                  <div className="mt-4 pt-3 border-t border-gray-200 animate-in fade-in slide-in-from-top-2">
                    <label className="block text-[13px] text-blue-600 font-medium mb-1.5">窗膜品牌 <span className="text-red-500">*</span></label>
                    <input 
                      type="text" placeholder="如：龙膜、3M等" value={formData.windowFilmBrand}
                      onChange={(e) => setFormData({...formData, windowFilmBrand: e.target.value})}
                      className="w-full px-3 py-2 bg-white text-sm border border-blue-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
                    />
                  </div>
                )}
              </div>
              <div>
                <label className="text-sm text-gray-600 font-medium">是否了解其它品牌精品</label>
                <OptionPills optionsList={options.yesNo} selectedValue={formData.knowsOtherBrands} onSelect={(v) => handleSingleSelect('knowsOtherBrands', v)} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 pb-8 z-10 shadow-[0_-4px_10px_rgba(0,0,0,0.03)]">
        <button 
          onClick={() => {
            if(!isFormValid) { alert("请填写带星号的必填项哦~"); return; }
            setView('success');
          }}
          className={`w-full py-3.5 rounded-xl font-medium text-base transition-all ${
            isFormValid ? 'bg-blue-600 text-white shadow-md shadow-blue-200 active:bg-blue-700' : 'bg-blue-300 text-white cursor-not-allowed'
          }`}
        >
          提交档案
        </button>
      </div>
    </div>
  );

  // -------------------------
  // 视图 4: 成功页 (不变)
  // -------------------------
  const renderSuccessView = () => (
    <div className="flex flex-col h-full bg-white animate-in zoom-in-95 duration-300 items-center justify-center p-6">
      <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
        <CheckCircle2 size={40} className="text-green-500" />
      </div>
      <h2 className="text-xl font-bold text-gray-800 mb-2">提交成功</h2>
      <p className="text-gray-500 text-sm text-center mb-10">轻改档案已同步更新<br/>感谢你的记录，继续加油哦！</p>
      <button 
        onClick={() => {
          setView('chat');
          setFormData({
            carUser: '', customerBackground: '', isMortgage: '', downPayment: '', 
            easyToCommunicate: '', isLocal: '', carUsage: '', buyBackground: '', 
            addedItems: [], giftItems: [], windowFilmBrand: '', knowsOtherBrands: ''
          });
        }}
        className="w-full max-w-[200px] py-3 rounded-full border border-gray-300 text-gray-700 font-medium active:bg-gray-50 transition-colors"
      >
        返回聊天
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center p-4 font-sans select-none">
      <div className="w-[375px] h-[812px] bg-black rounded-[40px] p-2 shadow-2xl relative overflow-hidden ring-1 ring-gray-900/5">
        <div className="absolute top-0 inset-x-0 h-6 flex justify-center z-50">
           <div className="w-32 h-6 bg-black rounded-b-3xl"></div>
        </div>
        <div className="bg-white w-full h-full rounded-[32px] overflow-hidden relative pt-6">
          {view === 'chat' && renderChatView()}
          {view === 'form' && renderFormView()}
          {view === 'report' && renderReportView()}
          {view === 'success' && renderSuccessView()}
        </div>
      </div>
    </div>
  );
}