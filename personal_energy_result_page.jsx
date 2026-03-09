import React, { useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Sparkles, MoonStar, ArrowRight, ArrowLeft, Flame, Waves, Leaf, Mountain, Compass, Stars, Download, CheckCircle2, Mail, UserRound, Globe2 } from "lucide-react";

const translations = {
  en: {
    selectLanguage: "Choose your language",
    startInEnglish: "English",
    startInChinese: "中文",
    appBadge: "Spiritual self-discovery demo",
    title: "The Ultimate Personal Awareness Test",
    titleZh: "终极觉知力测试",
    introText:
      "A mystical-mobile assessment for modern self-growth. Answer 81 questions and discover your five-element energy profile, your natural gifts, and your next alignment path.",
    infoTitle: "A few details before you begin",
    infoDesc: "Just enough to personalize the experience.",
    name: "Name",
    email: "Email",
    optional: "optional",
    continue: "Continue",
    whatYouGet: "What you’ll get",
    whatYouGetDesc: "Young mystical, lightly spiritual, emotionally grounded.",
    features: [
      "Five-element energy scores",
      "27 growth dimensions across mind, emotion, relationships, and direction",
      "A personalized balance index",
      "Tailored rituals and tiny, realistic action steps",
    ],
    begin: "Begin Assessment",
    question: "Question",
    complete: "complete",
    yourEnergyProfile: "Your Energy Profile",
    balance: "Balance",
    topStrengths: "Top Strengths",
    topStrengthsDesc: "Where your energy currently flows with the most ease.",
    growthEdges: "Growth Edges",
    growthEdgesDesc: "Not weaknesses. Just the places asking for more love and structure.",
    rituals: "Alignment Rituals",
    ritualsDesc: "Small practices that gently return your energy to flow.",
    microActions: "Tailored Micro-Actions",
    microActionsDesc: "Tiny next steps based on your current energy pattern.",
    restart: "Restart",
    continueQuiz: "Continue Quiz",
    back: "Back",
    previewResults: "Preview Results",
    ledBy: "Led by",
    language: "中文",
    saveImage: "Save Result as Long Image",
    saveHint: "Best viewed and saved from mobile.",
    saveDone: "Image opened in a new tab. Long press to save on your phone.",
    energyLabel: "Energy Tendency",
    getLevel: {
      strong: "Strong Flow",
      stable: "Stable",
      emerging: "Emerging",
      blocked: "Blocked",
    },
    ritualsList: [
      "Name the energy you want to embody each morning before checking your phone.",
      "Remove one recurring distraction this week to protect your attention.",
      "Schedule recovery before burnout instead of after it.",
    ],
    elementNames: {
      Wood: "Wood",
      Fire: "Fire",
      Earth: "Earth",
      Metal: "Metal",
      Water: "Water",
    },
  },
  zh: {
    selectLanguage: "选择语言",
    startInEnglish: "English",
    startInChinese: "中文",
    appBadge: "灵性自我探索体验",
    title: "The Ultimate Personal Awareness Test",
    titleZh: "宇宙级自我觉察测试",
    introText:
      "一个为现代个人成长设计的神秘感移动端测试。完成 81 道题后，你会看到自己的五行能量画像、天赋优势，以及下一步的对齐路径。",
    infoTitle: "开始前填写一点点信息",
    infoDesc: "只填最必要的内容，用来个性化你的结果。",
    name: "姓名",
    email: "邮箱",
    optional: "选填",
    continue: "继续",
    whatYouGet: "你将获得",
    whatYouGetDesc: "年轻神秘、轻灵性、又有情绪 grounding 的体验。",
    features: [
      "五行能量评分",
      "覆盖心智、情绪、关系与人生方向的 27 个成长维度",
      "个性化平衡指数",
      "为你定制的小型仪式与容易执行的行动建议",
    ],
    begin: "开始测试",
    question: "问题",
    complete: "已完成",
    yourEnergyProfile: "你的能量画像",
    balance: "平衡度",
    topStrengths: "核心优势",
    topStrengthsDesc: "这些是你当前能量流动最顺的地方。",
    growthEdges: "成长边界",
    growthEdgesDesc: "这不是缺点，而是这些地方需要更多滋养与结构。",
    rituals: "对齐仪式",
    ritualsDesc: "帮助你的能量重新流动起来的小练习。",
    microActions: "为你定制的微行动",
    microActionsDesc: "根据你当前的能量状态，为你生成的小而具体的下一步。",
    restart: "重新开始",
    continueQuiz: "继续答题",
    back: "返回",
    previewResults: "预览结果",
    ledBy: "你的主导能量是",
    language: "EN",
    saveImage: "保存结果长图",
    saveHint: "更适合在手机上查看和保存。",
    saveDone: "长图已在新标签页打开，可在手机上长按保存。",
    energyLabel: "能量倾向",
    getLevel: {
      strong: "强势流动",
      stable: "稳定",
      emerging: "发展中",
      blocked: "受阻",
    },
    ritualsList: [
      "每天早晨在看手机前，先命名你今天想呈现的能量。",
      "这周移除一个重复干扰源，保护你的注意力。",
      "不要等到完全耗尽才恢复，提前安排修复时间。",
    ],
    elementNames: {
      Wood: "木",
      Fire: "火",
      Earth: "土",
      Metal: "金",
      Water: "水",
    },
  },
};

const bilingualScale = {
  en: [
    { label: "Never", sub: "从不", value: 1 },
    { label: "Rarely", sub: "很少", value: 2 },
    { label: "Sometimes", sub: "有时", value: 3 },
    { label: "Often", sub: "经常", value: 4 },
    { label: "Always", sub: "总是", value: 5 },
  ],
  zh: [
    { label: "从不", sub: "Never", value: 1 },
    { label: "很少", sub: "Rarely", value: 2 },
    { label: "有时", sub: "Sometimes", value: 3 },
    { label: "经常", sub: "Often", value: 4 },
    { label: "总是", sub: "Always", value: 5 },
  ],
};

const dimensions = [
  {
    key: "inner_awareness",
    name: { en: "Inner Awareness", zh: "内在觉察" },
    element: "Metal",
    description: { en: "How deeply you notice your inner state.", zh: "你有多能觉察自己的内在状态。" },
    questions: [
      { en: "I notice my emotions and inner state throughout the day.", zh: "我能在一天里觉察自己的情绪和内在状态。" },
      { en: "I take time to reflect on my thoughts and behaviors.", zh: "我会花时间反思自己的想法和行为。" },
      { en: "I understand what triggers my emotional reactions.", zh: "我理解什么会触发自己的情绪反应。" },
    ],
  },
  {
    key: "authentic_self",
    name: { en: "Authentic Self", zh: "真实自我" },
    element: "Earth",
    description: { en: "How naturally you live as your real self.", zh: "你有多自然地活出真实的自己。" },
    questions: [
      { en: "I feel comfortable being my true self around others.", zh: "在他人面前，我能自在地做真实的自己。" },
      { en: "My actions usually reflect my true values.", zh: "我的行为通常反映我真正的价值观。" },
      { en: "I express my genuine thoughts and feelings.", zh: "我会表达真实的想法和感受。" },
    ],
  },
  {
    key: "self_compassion",
    name: { en: "Self Compassion", zh: "自我接纳" },
    element: "Earth",
    description: { en: "How gently you hold yourself in difficult moments.", zh: "当你处于困难时刻时，你对自己有多温柔。" },
    questions: [
      { en: "I treat myself with kindness when I make mistakes.", zh: "当我犯错时，我会善待自己。" },
      { en: "I accept my imperfections as part of being human.", zh: "我能接受不完美是人性的一部分。" },
      { en: "I avoid being overly critical of myself.", zh: "我不会过度批评自己。" },
    ],
  },
  {
    key: "inner_confidence",
    name: { en: "Inner Confidence", zh: "内在自信" },
    element: "Earth",
    description: { en: "How steady your inner trust feels.", zh: "你的内在信任感有多稳定。" },
    questions: [
      { en: "I believe I can handle challenges that come my way.", zh: "我相信自己能应对生活中的挑战。" },
      { en: "I trust my abilities and strengths.", zh: "我相信自己的能力和优势。" },
      { en: "I feel capable of shaping my own future.", zh: "我觉得自己有能力塑造未来。" },
    ],
  },
  {
    key: "growth_mindset",
    name: { en: "Growth Mindset", zh: "成长心态" },
    element: "Wood",
    description: { en: "Your openness to evolve and stretch.", zh: "你对成长、延展和改变的开放度。" },
    questions: [
      { en: "I see challenges as opportunities to grow.", zh: "我把挑战看作成长机会。" },
      { en: "I actively look for ways to improve myself.", zh: "我会主动寻找提升自己的方式。" },
      { en: "I am willing to step outside my comfort zone.", zh: "我愿意走出舒适区。" },
    ],
  },
  {
    key: "optimistic_energy",
    name: { en: "Optimistic Energy", zh: "积极能量" },
    element: "Water",
    description: { en: "How much light and possibility you feel around the future.", zh: "你对未来感受到多少希望与可能性。" },
    questions: [
      { en: "I usually expect good things to happen in the future.", zh: "我通常相信未来会发生好事。" },
      { en: "I focus on possibilities rather than limitations.", zh: "我更关注可能性，而不是限制。" },
      { en: "I try to see the positive side of difficult situations.", zh: "面对困难时，我会尝试看到积极的一面。" },
    ],
  },
  {
    key: "cognitive_flexibility",
    name: { en: "Cognitive Flexibility", zh: "思维弹性" },
    element: "Wood",
    description: { en: "How fluidly your mind can adapt.", zh: "你的思维有多能够灵活调整。" },
    questions: [
      { en: "I am open to changing my perspective.", zh: "我愿意改变自己的看法。" },
      { en: "I adapt my thinking when new information appears.", zh: "当出现新信息时，我会调整自己的想法。" },
      { en: "I consider multiple viewpoints before forming an opinion.", zh: "我会从多个角度看问题后再形成判断。" },
    ],
  },
  {
    key: "purpose_meaning",
    name: { en: "Purpose & Meaning", zh: "人生意义感" },
    element: "Water",
    description: { en: "Your felt connection to meaning and direction.", zh: "你对意义与方向的连接感。" },
    questions: [
      { en: "I feel my life has a sense of purpose.", zh: "我觉得自己的人生有明确意义。" },
      { en: "I reflect on what truly matters to me.", zh: "我会思考什么对我真正重要。" },
      { en: "My daily actions connect to something meaningful.", zh: "我的日常行动与重要的事情有关联。" },
    ],
  },
  {
    key: "emotional_balance",
    name: { en: "Emotional Balance", zh: "情绪平衡" },
    element: "Earth",
    description: { en: "Your ability to return to center.", zh: "你让自己回到中心状态的能力。" },
    questions: [
      { en: "I can calm myself when I feel stressed or overwhelmed.", zh: "当我压力大或 overwhelmed 时，我能让自己平静下来。" },
      { en: "I manage my emotions in healthy ways.", zh: "我能以健康的方式处理情绪。" },
      { en: "My emotions rarely control my actions.", zh: "情绪很少直接控制我的行为。" },
    ],
  },
  {
    key: "empathic_awareness",
    name: { en: "Empathic Awareness", zh: "共情觉察" },
    element: "Water",
    description: { en: "How well you sense other people’s inner world.", zh: "你感知他人内在世界的能力。" },
    questions: [
      { en: "I can sense how others might be feeling.", zh: "我能感受到他人可能的情绪状态。" },
      { en: "I listen carefully when people share their experiences.", zh: "当别人分享经历时，我会认真倾听。" },
      { en: "I try to understand perspectives different from my own.", zh: "我会尝试理解与自己不同的观点。" },
    ],
  },
  {
    key: "courageous_expression",
    name: { en: "Courageous Expression", zh: "勇敢表达" },
    element: "Fire",
    description: { en: "Your willingness to speak honestly and clearly.", zh: "你诚实清晰表达自己的意愿。" },
    questions: [
      { en: "I speak honestly even when it feels uncomfortable.", zh: "即使不舒服，我也会诚实表达。" },
      { en: "I share my opinions respectfully and clearly.", zh: "我会清晰而尊重地表达观点。" },
      { en: "I express my needs and boundaries.", zh: "我会表达自己的需求与边界。" },
    ],
  },
  {
    key: "focused_energy",
    name: { en: "Focused Energy", zh: "专注能量" },
    element: "Metal",
    description: { en: "Your ability to direct attention with intention.", zh: "你把注意力有意识地聚焦的能力。" },
    questions: [
      { en: "I stay focused on the task I am working on.", zh: "我能专注于手头的事情。" },
      { en: "I minimize distractions when I need to concentrate.", zh: "需要专注时，我会减少干扰。" },
      { en: "I complete tasks with sustained attention.", zh: "我能持续专注地完成任务。" },
    ],
  },
  {
    key: "energy_prioritization",
    name: { en: "Energy Prioritization", zh: "能量优先级" },
    element: "Metal",
    description: { en: "How wisely you place your time and energy.", zh: "你有多智慧地分配时间和精力。" },
    questions: [
      { en: "I invest my time in what matters most to me.", zh: "我会把时间投入在最重要的事情上。" },
      { en: "I know how to say no to low-priority tasks.", zh: "我知道如何拒绝低优先级的事情。" },
      { en: "I regularly reflect on where my energy goes.", zh: "我会定期反思自己的精力都花去了哪里。" },
    ],
  },
  {
    key: "intuitive_decision_making",
    name: { en: "Intuitive Decision Making", zh: "直觉决策" },
    element: "Metal",
    description: { en: "How you blend inner knowing with clear judgment.", zh: "你如何把内在直觉与清晰判断结合起来。" },
    questions: [
      { en: "I trust both logic and intuition when making decisions.", zh: "做决定时，我会同时信任理性与直觉。" },
      { en: "I take time to gather information before deciding.", zh: "做决定前，我会花时间收集信息。" },
      { en: "I feel confident about my decisions.", zh: "我对自己的决定有信心。" },
    ],
  },
  {
    key: "creative_problem_solving",
    name: { en: "Creative Problem Solving", zh: "创造性解决问题" },
    element: "Wood",
    description: { en: "How imaginatively you move through complexity.", zh: "你用多有创造力的方式穿越复杂问题。" },
    questions: [
      { en: "I look for creative solutions to challenges.", zh: "我会为挑战寻找创造性的解决方法。" },
      { en: "I consider different possibilities when facing problems.", zh: "面对问题时，我会考虑不同可能性。" },
      { en: "I stay curious when solving complex situations.", zh: "解决复杂问题时，我会保持好奇心。" },
    ],
  },
  {
    key: "life_vision",
    name: { en: "Life Vision", zh: "人生愿景" },
    element: "Wood",
    description: { en: "Your ability to sense and shape where you are going.", zh: "你感知并塑造人生方向的能力。" },
    questions: [
      { en: "I have a clear idea of the life I want to create.", zh: "我对自己想创造的人生有清晰想法。" },
      { en: "I think about my long-term direction.", zh: "我会思考自己的长期方向。" },
      { en: "I take steps toward my future goals.", zh: "我会为未来目标采取行动。" },
    ],
  },
  {
    key: "alignment",
    name: { en: "Alignment", zh: "内外一致" },
    element: "Metal",
    description: { en: "How much your life reflects your deeper truth.", zh: "你的生活有多反映你的深层真实。" },
    questions: [
      { en: "My actions align with my values.", zh: "我的行动与价值观一致。" },
      { en: "I make choices that reflect who I truly am.", zh: "我的选择反映真实的自己。" },
      { en: "I feel aligned with the path I am on.", zh: "我觉得自己正在走一条与内心一致的路。" },
    ],
  },
  {
    key: "personal_responsibility",
    name: { en: "Personal Responsibility", zh: "人生责任感" },
    element: "Metal",
    description: { en: "How fully you own your choices and path.", zh: "你对自己选择和人生路径的承担程度。" },
    questions: [
      { en: "I take responsibility for my choices.", zh: "我会为自己的选择负责。" },
      { en: "I focus on what I can control in my life.", zh: "我会专注于自己能掌控的事。" },
      { en: "I learn from my mistakes.", zh: "我会从错误中学习。" },
    ],
  },
  {
    key: "self_empowerment",
    name: { en: "Self Empowerment", zh: "自我赋能" },
    element: "Water",
    description: { en: "How strongly you feel able to change your life.", zh: "你有多相信自己能够改变人生。" },
    questions: [
      { en: "I believe I have the power to improve my life.", zh: "我相信自己有能力改善人生。" },
      { en: "I take initiative to create opportunities.", zh: "我会主动创造机会。" },
      { en: "I actively shape my personal growth.", zh: "我会主动塑造自己的成长。" },
    ],
  },
  {
    key: "initiative_action",
    name: { en: "Initiative & Action", zh: "主动行动" },
    element: "Wood",
    description: { en: "How readily you move energy into motion.", zh: "你把能量转化为行动的速度和意愿。" },
    questions: [
      { en: "I take action instead of waiting for things to happen.", zh: "我会主动行动，而不是等待事情发生。" },
      { en: "I start projects or ideas that excite me.", zh: "我会开始那些让我兴奋的项目或想法。" },
      { en: "I follow through on my intentions.", zh: "我会落实自己的意图和计划。" },
    ],
  },
  {
    key: "relationship_energy",
    name: { en: "Relationship Energy", zh: "关系能量" },
    element: "Fire",
    description: { en: "The vitality and sincerity you bring into connection.", zh: "你在关系中带来的活力与真诚。" },
    questions: [
      { en: "I invest time in meaningful relationships.", zh: "我会投入时间经营有意义的关系。" },
      { en: "I show care and appreciation for people in my life.", zh: "我会表达对身边人的关心和感谢。" },
      { en: "I value deep and genuine connections.", zh: "我重视真实而深刻的连接。" },
    ],
  },
  {
    key: "support_network",
    name: { en: "Support Network", zh: "支持系统" },
    element: "Earth",
    description: { en: "The quality of support around you.", zh: "你周围支持系统的质量。" },
    questions: [
      { en: "I have people I can rely on when I need help.", zh: "当我需要帮助时，我有可以依靠的人。" },
      { en: "I stay connected with people who support my growth.", zh: "我会和支持我成长的人保持联系。" },
      { en: "I seek support when I need it.", zh: "当我需要时，我会主动寻求支持。" },
    ],
  },
  {
    key: "collaborative_flow",
    name: { en: "Collaborative Flow", zh: "合作流动" },
    element: "Water",
    description: { en: "How naturally you co-create with others.", zh: "你与他人共同创造的自然程度。" },
    questions: [
      { en: "I enjoy working or creating with others.", zh: "我喜欢与他人合作或共同创造。" },
      { en: "I appreciate different ideas and contributions.", zh: "我欣赏不同的想法和贡献。" },
      { en: "I support shared success.", zh: "我支持共同成功。" },
    ],
  },
  {
    key: "encouraging_presence",
    name: { en: "Encouraging Presence", zh: "支持型存在感" },
    element: "Fire",
    description: { en: "The uplifting atmosphere you create around others.", zh: "你给周围人带来的鼓舞与支持氛围。" },
    questions: [
      { en: "I encourage people around me.", zh: "我会鼓励身边的人。" },
      { en: "I celebrate others’ achievements.", zh: "我会为他人的成就感到开心。" },
      { en: "I create a positive atmosphere in groups.", zh: "我能在群体中营造积极氛围。" },
    ],
  },
  {
    key: "appreciation_gratitude",
    name: { en: "Appreciation & Gratitude", zh: "感恩意识" },
    element: "Fire",
    description: { en: "Your capacity to notice beauty and express thanks.", zh: "你看见美好并表达感谢的能力。" },
    questions: [
      { en: "I regularly express gratitude.", zh: "我会经常表达感恩。" },
      { en: "I notice the good things in my life.", zh: "我能注意到生活中的美好。" },
      { en: "I appreciate people who support me.", zh: "我会感谢那些支持我的人。" },
    ],
  },
  {
    key: "energy_recovery",
    name: { en: "Energy Recovery", zh: "能量恢复" },
    element: "Earth",
    description: { en: "How well you recharge and restore.", zh: "你补充和恢复能量的能力。" },
    questions: [
      { en: "I take time to rest and recharge.", zh: "我会留出时间休息和充电。" },
      { en: "I maintain habits that support my physical wellbeing.", zh: "我保持有益于身体状态的习惯。" },
      { en: "I recognize when I need a break.", zh: "我能意识到自己何时需要休息。" },
    ],
  },
  {
    key: "personal_presence",
    name: { en: "Personal Presence", zh: "个人气场" },
    element: "Fire",
    description: { en: "The clarity and energy of how you show up.", zh: "你呈现自己的清晰度和能量感。" },
    questions: [
      { en: "I express myself clearly and confidently.", zh: "我能清晰而自信地表达自己。" },
      { en: "I bring positive energy into the spaces I enter.", zh: "我能为进入的空间带来积极能量。" },
      { en: "People feel comfortable interacting with me.", zh: "他人与我相处时会感到自在。" },
    ],
  },
];

const elementMeta = {
  Wood: {
    icon: Leaf,
    gradient: "from-emerald-400/30 to-lime-300/10",
    accent: "bg-emerald-300/80",
    desc: { en: "Growth, direction, expansion", zh: "生长、方向、延展" },
  },
  Fire: {
    icon: Flame,
    gradient: "from-fuchsia-400/30 to-rose-300/10",
    accent: "bg-fuchsia-300/80",
    desc: { en: "Expression, warmth, connection", zh: "表达、温度、连接" },
  },
  Earth: {
    icon: Mountain,
    gradient: "from-amber-300/30 to-orange-200/10",
    accent: "bg-amber-200/80",
    desc: { en: "Grounding, nourishment, steadiness", zh: "落地、滋养、稳定" },
  },
  Metal: {
    icon: Compass,
    gradient: "from-cyan-300/30 to-slate-200/10",
    accent: "bg-cyan-200/80",
    desc: { en: "Clarity, boundaries, focus", zh: "清晰、边界、专注" },
  },
  Water: {
    icon: Waves,
    gradient: "from-violet-400/30 to-indigo-300/10",
    accent: "bg-violet-300/80",
    desc: { en: "Intuition, flow, inner wisdom", zh: "直觉、流动、内在智慧" },
  },
};

function getLevel(score, t) {
  if (score >= 4.2) return t.getLevel.strong;
  if (score >= 3.4) return t.getLevel.stable;
  if (score >= 2.6) return t.getLevel.emerging;
  return t.getLevel.blocked;
}

function getInsight(topElement, lowElement, lang) {
  const bank = {
    en: {
      Wood: "You are in a season of becoming. Your energy grows through movement, experimentation, and future vision.",
      Fire: "Your energy shines through expression and connection. You come alive when your voice and heart are fully engaged.",
      Earth: "Your power lives in steadiness, tenderness, and grounded care. You are strongest when your inner world feels safe.",
      Metal: "Your gift is discernment. You move well when your life feels clear, intentional, and clean of energetic clutter.",
      Water: "Your deepest strength is intuitive intelligence. Reflection, feeling, and inner truth guide your path.",
    },
    zh: {
      Wood: "你正处于生长与展开的阶段。你的能量通过行动、尝试和未来愿景而不断变强。",
      Fire: "你的能量通过表达与连接闪耀。当你的声音和内心都被点亮时，你最有生命力。",
      Earth: "你的力量活在稳定、温柔和被照顾的感觉里。当你的内在感到安全时，你最强大。",
      Metal: "你的天赋是分辨力。当生活清晰、有意图、并减少能量杂讯时，你会运转得最好。",
      Water: "你最深层的力量来自直觉智慧。反思、感受和内在真实会指引你的路。",
    },
  };
  const shadow = {
    en: {
      Wood: "Growth may feel stalled when you lose sight of direction.",
      Fire: "Your light may dim when expression or connection feels restricted.",
      Earth: "You may need more rest, nourishment, and emotional grounding.",
      Metal: "Your energy may scatter when focus and boundaries weaken.",
      Water: "You may feel disconnected when you stop listening to your inner voice.",
    },
    zh: {
      Wood: "当你失去方向感时，成长能量可能会停滞。",
      Fire: "当表达和连接受阻时，你的光会变暗。",
      Earth: "你可能需要更多休息、滋养和情绪上的落地感。",
      Metal: "当专注和边界变弱时，你的能量会开始分散。",
      Water: "当你不再倾听自己的内在声音时，会感到失联。",
    },
  };
  return `${bank[lang][topElement]} ${shadow[lang][lowElement]}`;
}

function getTailoredActions(lowDims, lang) {
  const map = {
    en: {
      energy_recovery: [
        "Tonight, put your phone down 20 minutes earlier and let your body land before sleep.",
        "When you feel drained, pause for 3 minutes of slow breathing: inhale 4, exhale 6.",
      ],
      focused_energy: [
        "Pick one 15-minute distraction-free block tomorrow and protect it like an appointment.",
        "Before starting work, write one sentence: What deserves my full attention right now?",
      ],
      support_network: [
        "Send one simple message this week: ‘Thinking of you. Want to catch up soon?’",
        "When things feel heavy, name one person you could reach out to instead of carrying it alone.",
      ],
      self_compassion: [
        "Before sleep, write down one thing you handled better than your inner critic admits.",
        "When you make a mistake, speak to yourself as if you were talking to a close friend.",
      ],
      alignment: [
        "Each morning, ask: What is one small choice today that would feel more true to me?",
        "Before saying yes, take one breath and check whether your body feels open or contracted.",
      ],
      emotional_balance: [
        "When emotions rise, place a hand on your chest and name the feeling before reacting.",
        "Create a 5-minute evening reset with dim lights, slow breaths, and no scrolling.",
      ],
      appreciation_gratitude: [
        "Before bed, name three specific things that supported you today.",
        "Thank one person this week for something small but real.",
      ],
      purpose_meaning: [
        "Start the day with one line in your notes: Why does today matter to me?",
        "At night, reflect on one moment that felt quietly meaningful.",
      ],
    },
    zh: {
      energy_recovery: [
        "今晚把手机提前 20 分钟放下，让身体在睡前慢慢落地。",
        "当你感到很累时，停下来做 3 分钟缓慢呼吸：吸气 4 秒，呼气 6 秒。",
      ],
      focused_energy: [
        "明天先留出一个 15 分钟无干扰时段，把它当成正式约会一样守住。",
        "开始做事前，先写一句：现在最值得我全神贯注的是什么？",
      ],
      support_network: [
        "这周给一个人发条简单消息：想到你了，最近想不想聊聊？",
        "当你觉得很重时，先说出一个你可以联系的人，而不是一个人扛。",
      ],
      self_compassion: [
        "睡前写下一件你其实做得比内在批评者说得更好的事情。",
        "犯错时，试着用你安慰朋友的口气来对自己说话。",
      ],
      alignment: [
        "每天早晨问自己：今天哪一个小选择会让我更接近真实的自己？",
        "答应别人之前，先吸一口气，感受身体是打开还是收缩。",
      ],
      emotional_balance: [
        "情绪上来时，把手放在胸口，先命名情绪，再决定怎么回应。",
        "做一个 5 分钟晚间重置：调暗灯光、慢呼吸、不刷手机。",
      ],
      appreciation_gratitude: [
        "睡前说出今天 3 件具体支持了你的事情。",
        "这周认真感谢一个人，为一件小但真实的事。",
      ],
      purpose_meaning: [
        "早上在备忘录写一句：今天为什么对我重要？",
        "晚上回想一个安静但有意义的瞬间。",
      ],
    },
  };

  const defaults = lang === "zh"
    ? [
        "每天早晨做 5 分钟静坐或冥想，在行动前先让心安静下来。",
        "当你感到压力堆积时，用 3 分钟深呼吸把自己带回身体。",
        "睡前写下 3 件值得感恩的小事，帮自己结束这一天。",
      ]
    : [
        "Try 5 minutes of quiet meditation each morning before the day takes over.",
        "When stress builds, use 3 minutes of deep breathing to return to your body.",
        "Before sleep, write down 3 specific things you feel grateful for today.",
      ];

  const picks = [];
  lowDims.forEach((dim) => {
    if (map[lang][dim.key]) picks.push(...map[lang][dim.key]);
  });
  return [...new Set([...picks, ...defaults])].slice(0, 6);
}

function ElementOrb({ name, score, lang, t }) {
  const meta = elementMeta[name];
  const Icon = meta.icon;
  return (
    <div className={`rounded-3xl border border-white/10 bg-gradient-to-br ${meta.gradient} p-4 shadow-[0_0_40px_rgba(0,0,0,0.18)] backdrop-blur`}>
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-white/10 p-2 text-white">
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <div className="font-medium text-white">{t.elementNames[name]} <span className="text-white/50">{lang === "en" ? "" : name}</span></div>
            <div className="text-xs text-white/60">{meta.desc[lang]}</div>
          </div>
        </div>
        <Badge className="border-white/10 bg-white/10 text-white">{Math.round(score)}/100</Badge>
      </div>
      <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
        <div className={`h-full rounded-full ${meta.accent}`} style={{ width: `${score}%` }} />
      </div>
    </div>
  );
}

export default function PersonalEnergyResultPage() {
  const [lang, setLang] = useState(null);
  const [screen, setScreen] = useState("language");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [user, setUser] = useState({ name: "", email: "" });
  const [saveMessage, setSaveMessage] = useState("");
  const resultRef = useRef(null);

  const t = translations[lang || "en"];
  const scale = bilingualScale[lang || "en"];

  const allQuestions = useMemo(
    () =>
      dimensions.flatMap((dimension) =>
        dimension.questions.map((question, qIndex) => ({
          id: `${dimension.key}_${qIndex}`,
          dimensionKey: dimension.key,
          dimensionName: dimension.name,
          element: dimension.element,
          question,
          description: dimension.description,
        }))
      ),
    []
  );

  const total = allQuestions.length;
  const currentQ = allQuestions[current];
  const progress = (Object.keys(answers).length / total) * 100;

  const results = useMemo(() => {
    const dimScores = dimensions.map((dim) => {
      const ids = dim.questions.map((_, idx) => `${dim.key}_${idx}`);
      const values = ids.map((id) => answers[id]).filter(Boolean);
      const avg = values.length ? values.reduce((a, b) => a + b, 0) / values.length : 0;
      return { ...dim, avg };
    });

    const elementNames = ["Wood", "Fire", "Earth", "Metal", "Water"];
    const elementScores = elementNames.map((element) => {
      const dims = dimScores.filter((d) => d.element === element);
      const avg = dims.length ? dims.reduce((sum, d) => sum + d.avg, 0) / dims.length : 0;
      return { name: element, avg, score100: avg * 20 };
    });

    const rankedElements = [...elementScores].sort((a, b) => b.avg - a.avg);
    const rankedDims = [...dimScores].sort((a, b) => b.avg - a.avg);
    const completeScores = elementScores.every((e) => e.avg > 0);
    const maxScore = Math.max(...elementScores.map((e) => e.score100), 0);
    const minScore = Math.min(...elementScores.filter((e) => e.avg > 0).map((e) => e.score100), 100);
    const balance = completeScores ? Math.round(100 - (maxScore - minScore)) : 0;

    return { dimScores, elementScores, rankedElements, rankedDims, balance };
  }, [answers]);

  const answerQuestion = (value) => {
    const updated = { ...answers, [currentQ.id]: value };
    setAnswers(updated);
    if (current < total - 1) setCurrent(current + 1);
    else setScreen("results");
  };

  const topElement = results.rankedElements[0]?.name || "Water";
  const lowElement = results.rankedElements[results.rankedElements.length - 1]?.name || "Earth";
  const topDims = results.rankedDims.slice(0, 3);
  const lowDims = [...results.rankedDims].reverse().slice(0, 3);
  const tailoredActions = getTailoredActions(lowDims, lang || "en");

  const saveAsImage = async () => {
    setSaveMessage("");
    try {
      const node = resultRef.current;
      if (!node) return;
      const html2canvasMod = await import("html2canvas");
      const html2canvas = html2canvasMod.default;
      const canvas = await html2canvas(node, {
        backgroundColor: "#09090f",
        scale: 2,
        useCORS: true,
        windowWidth: node.scrollWidth,
      });
      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `${(user.name || "energy-profile").replace(/\s+/g, "-").toLowerCase()}-result.png`;
      link.click();
      const w = window.open();
      if (w) w.document.write(`<title>Result Image</title><img src="${dataUrl}" style="width:100%;display:block;background:#09090f" />`);
      setSaveMessage(t.saveDone);
    } catch (e) {
      setSaveMessage(lang === "zh" ? "当前环境暂时无法直接导出图片，但代码结构已经准备好了。" : "Image export may not work in this preview environment, but the feature is wired for a real web build.");
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(168,85,247,0.25),_transparent_24%),radial-gradient(circle_at_20%_10%,_rgba(59,130,246,0.14),_transparent_20%),radial-gradient(circle_at_80%_0%,_rgba(236,72,153,0.14),_transparent_18%),radial-gradient(circle_at_50%_80%,_rgba(56,189,248,0.08),_transparent_24%),linear-gradient(180deg,_#05050a_0%,_#090914_28%,_#0b1020_58%,_#11162c_100%)] text-white">
      <div className="pointer-events-none fixed inset-0 opacity-40">
        <div className="absolute left-8 top-20 h-40 w-40 rounded-full bg-fuchsia-500/10 blur-3xl" />
        <div className="absolute right-0 top-0 h-56 w-56 rounded-full bg-violet-500/10 blur-3xl" />
        <div className="absolute bottom-20 left-1/4 h-48 w-48 rounded-full bg-cyan-400/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-md px-4 py-6">
        <AnimatePresence mode="wait">
          {screen === "language" && (
            <motion.div key="language" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-5 pt-16">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-3xl border border-white/10 bg-white/5 shadow-[0_0_50px_rgba(168,85,247,0.24)] backdrop-blur">
                  <Globe2 className="h-8 w-8 text-violet-200" />
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70 backdrop-blur">
                  <Stars className="h-3.5 w-3.5" /> Choose your portal
                </div>
                <h1 className="mt-5 text-3xl font-semibold tracking-tight">The Ultimate Personal Awareness Test</h1>
                <p className="mt-2 text-lg text-white/70">宇宙级自我觉察测试</p>
                <p className="mt-4 text-sm text-white/60">Select your language to begin.</p>
              </div>
              <div className="grid gap-3">
                <Button onClick={() => { setLang("en"); setScreen("intro"); }} className="h-14 rounded-2xl bg-white text-slate-900 hover:bg-white/90">English <ArrowRight className="ml-2 h-4 w-4" /></Button>
                <Button onClick={() => { setLang("zh"); setScreen("intro"); }} variant="outline" className="h-14 rounded-2xl border-white/10 bg-white/5 text-white hover:bg-white/10">中文 <ArrowRight className="ml-2 h-4 w-4" /></Button>
              </div>
            </motion.div>
          )}

          {screen === "intro" && (
            <motion.div key="intro" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-5">
              <div className="mb-3 flex justify-end">
                <button onClick={() => setLang((prev) => (prev === "en" ? "zh" : "en"))} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/80 backdrop-blur hover:bg-white/10">{t.language}</button>
              </div>
              <div className="pt-3 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-3xl border border-white/10 bg-white/5 shadow-[0_0_50px_rgba(168,85,247,0.24)] backdrop-blur">
                  <MoonStar className="h-8 w-8 text-violet-200" />
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70 backdrop-blur">
                  <Stars className="h-3.5 w-3.5" /> {t.appBadge}
                </div>
                <h1 className="mt-5 text-4xl font-semibold tracking-tight">{t.title}</h1>
                <p className="mt-2 text-base text-white/70">{t.titleZh}</p>
                <p className="mt-3 text-sm leading-7 text-white/70">{t.introText}</p>
              </div>

              <Card className="overflow-hidden rounded-[28px] border-white/10 bg-white/5 shadow-[0_0_60px_rgba(0,0,0,0.3)] backdrop-blur">
                <CardHeader>
                  <CardTitle className="text-white">{t.infoTitle}</CardTitle>
                  <CardDescription className="text-white/60">{t.infoDesc}</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-3">
                  <div className="relative">
                    <UserRound className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" />
                    <Input value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} placeholder={t.name} className="h-12 rounded-2xl border-white/10 bg-white/5 pl-10 text-white placeholder:text-white/35" />
                  </div>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" />
                    <Input value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} placeholder={`${t.email} (${t.optional})`} className="h-12 rounded-2xl border-white/10 bg-white/5 pl-10 text-white placeholder:text-white/35" />
                  </div>
                </CardContent>
              </Card>

              <Card className="overflow-hidden rounded-[28px] border-white/10 bg-white/5 shadow-[0_0_60px_rgba(0,0,0,0.3)] backdrop-blur">
                <CardHeader>
                  <CardTitle className="text-white">{t.whatYouGet}</CardTitle>
                  <CardDescription className="text-white/60">{t.whatYouGetDesc}</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-3">
                  {t.features.map((item) => <div key={item} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80">{item}</div>)}
                </CardContent>
              </Card>

              <Button onClick={() => setScreen("quiz")} className="h-14 w-full rounded-2xl bg-white text-slate-900 hover:bg-white/90">{t.begin} <ArrowRight className="ml-2 h-4 w-4" /></Button>
            </motion.div>
          )}

          {screen === "quiz" && currentQ && (
            <motion.div key="quiz" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-4">
              <div className="mb-2 flex justify-between">
                <button onClick={() => setLang((prev) => (prev === "en" ? "zh" : "en"))} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/80 backdrop-blur hover:bg-white/10">{t.language}</button>
                <button onClick={() => setScreen("results")} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/80 backdrop-blur hover:bg-white/10">{t.previewResults}</button>
              </div>
              <div className="sticky top-0 z-10 space-y-3 rounded-[28px] border border-white/10 bg-slate-950/70 p-4 backdrop-blur-xl">
                <div className="flex items-center justify-between text-xs text-white/60">
                  <span>{t.question} {current + 1} / {total}</span>
                  <span>{Math.round(progress)}% {t.complete}</span>
                </div>
                <Progress value={progress} className="h-2 bg-white/10" />
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="text-sm font-medium text-white">{currentQ.dimensionName[lang]}</div>
                    <div className="text-xs text-white/55">{currentQ.description[lang]}</div>
                  </div>
                  <Badge className="border-white/10 bg-white/10 text-white">{t.elementNames[currentQ.element]}</Badge>
                </div>
              </div>

              <Card className="rounded-[32px] border-white/10 bg-white/5 shadow-[0_0_60px_rgba(0,0,0,0.24)] backdrop-blur-xl">
                <CardContent className="p-6 pt-7">
                  <div className="text-lg leading-8 text-white">{currentQ.question[lang]}</div>
                  <div className="mt-2 text-sm leading-6 text-white/45">{currentQ.question[lang === "en" ? "zh" : "en"]}</div>
                  <div className="mt-6 grid gap-3">
                    {scale.map((option) => (
                      <button key={option.value} onClick={() => answerQuestion(option.value)} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-left text-sm text-white/80 transition hover:bg-white/10">
                        <div className="flex items-center justify-between">
                          <div>
                            <div>{option.label}</div>
                            <div className="text-xs text-white/45">{option.sub}</div>
                          </div>
                          <Sparkles className="h-4 w-4 opacity-60" />
                        </div>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Button variant="outline" onClick={() => (current === 0 ? setScreen("intro") : setCurrent(current - 1))} className="h-12 w-full rounded-2xl border-white/10 bg-white/5 text-white hover:bg-white/10"><ArrowLeft className="mr-2 h-4 w-4" /> {t.back}</Button>
            </motion.div>
          )}

          {screen === "results" && (
            <motion.div key="results" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-4 pb-8">
              <div className="mb-2 flex items-center justify-between">
                <button onClick={() => setLang((prev) => (prev === "en" ? "zh" : "en"))} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/80 backdrop-blur hover:bg-white/10">{t.language}</button>
                <div className="text-xs text-white/50">{t.saveHint}</div>
              </div>

              <div ref={resultRef} className="space-y-4 rounded-[34px] bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-1">
                <div className="space-y-4 rounded-[30px] border border-white/10 bg-[radial-gradient(circle_at_top,_rgba(168,85,247,0.16),_transparent_30%),linear-gradient(180deg,_rgba(255,255,255,0.05),_rgba(255,255,255,0.03))] p-4 backdrop-blur-xl">
                  <div className="rounded-[28px] border border-white/10 bg-white/5 p-5 shadow-[0_0_60px_rgba(0,0,0,0.28)] backdrop-blur-xl">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-xs uppercase tracking-[0.26em] text-white/45">{t.yourEnergyProfile}</div>
                        <h2 className="mt-2 text-3xl font-semibold">{user.name ? `${user.name} · ` : ""}{t.ledBy} {t.elementNames[topElement]}</h2>
                        <p className="mt-3 text-sm leading-7 text-white/70">{getInsight(topElement, lowElement, lang || "en")}</p>
                        {user.email ? <p className="mt-3 text-xs text-white/40">{user.email}</p> : null}
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-center">
                        <div className="text-[10px] uppercase tracking-[0.22em] text-white/45">{t.balance}</div>
                        <div className="mt-1 text-2xl font-semibold">{results.balance}</div>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-3">
                    {results.elementScores.map((element) => <ElementOrb key={element.name} name={element.name} score={element.score100} lang={lang || "en"} t={t} />)}
                  </div>

                  <Card className="rounded-[28px] border-white/10 bg-white/5 backdrop-blur-xl">
                    <CardHeader>
                      <CardTitle className="text-white">{t.topStrengths}</CardTitle>
                      <CardDescription className="text-white/60">{t.topStrengthsDesc}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {topDims.map((dim) => (
                        <div key={dim.key} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                          <div className="flex items-center justify-between gap-3">
                            <div>
                              <div className="font-medium text-white">{dim.name[lang]}</div>
                              <div className="text-xs text-white/55">{dim.description[lang]}</div>
                            </div>
                            <Badge className="border-white/10 bg-white/10 text-white">{getLevel(dim.avg, t)}</Badge>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card className="rounded-[28px] border-white/10 bg-white/5 backdrop-blur-xl">
                    <CardHeader>
                      <CardTitle className="text-white">{t.growthEdges}</CardTitle>
                      <CardDescription className="text-white/60">{t.growthEdgesDesc}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {lowDims.map((dim) => (
                        <div key={dim.key} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                          <div className="flex items-center justify-between gap-3">
                            <div>
                              <div className="font-medium text-white">{dim.name[lang]}</div>
                              <div className="text-xs text-white/55">{dim.description[lang]}</div>
                            </div>
                            <Badge className="border-white/10 bg-white/10 text-white">{getLevel(dim.avg, t)}</Badge>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card className="rounded-[28px] border-white/10 bg-white/5 backdrop-blur-xl">
                    <CardHeader>
                      <CardTitle className="text-white">{t.rituals}</CardTitle>
                      <CardDescription className="text-white/60">{t.ritualsDesc}</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-3">
                      {t.ritualsList.map((item) => <div key={item} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-6 text-white/80">{item}</div>)}
                    </CardContent>
                  </Card>

                  <Card className="rounded-[28px] border-white/10 bg-white/5 backdrop-blur-xl">
                    <CardHeader>
                      <CardTitle className="text-white">{t.microActions}</CardTitle>
                      <CardDescription className="text-white/60">{t.microActionsDesc}</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-3">
                      {tailoredActions.map((item, idx) => (
                        <div key={`${item}-${idx}`} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-6 text-white/80">
                          <div className="flex gap-3">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-violet-200" />
                            <span>{item}</span>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </div>

              <Button onClick={saveAsImage} className="h-12 w-full rounded-2xl bg-white text-slate-900 hover:bg-white/90"><Download className="mr-2 h-4 w-4" /> {t.saveImage}</Button>
              {saveMessage ? <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-xs leading-6 text-white/70">{saveMessage}</div> : null}

              <div className="grid grid-cols-2 gap-3">
                <Button onClick={() => { setAnswers({}); setCurrent(0); setScreen("language"); setUser({ name: "", email: "" }); }} variant="outline" className="h-12 rounded-2xl border-white/10 bg-white/5 text-white hover:bg-white/10">{t.restart}</Button>
                <Button onClick={() => setScreen("quiz")} className="h-12 rounded-2xl bg-white text-slate-900 hover:bg-white/90">{t.continueQuiz}</Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
