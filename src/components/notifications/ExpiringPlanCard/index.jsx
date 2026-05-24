import { useState } from "react";
import { AlertCircle, CalendarDays, ChevronDown } from "lucide-react";

import styles from "./ExpiringPlanCard.module.css";

// 即将到期学习计划卡片组件
// props:
// - plan: 当前计划的数据
// - onAcknowledge: 点击 “Got it” 后触发的方法
export default function ExpiringPlanCard({ onAcknowledge, plan }) {

  // 控制卡片是否展开详情
  const [expanded, setExpanded] = useState(false);

  // 点击 Got it 按钮时触发
  const handleAcknowledge = (event) => {

    // 阻止事件冒泡
    // 避免点击按钮时同时触发卡片展开
    event.stopPropagation();

    // 调用父组件传进来的方法
    // 并把当前 plan 的 id 传出去
    onAcknowledge(plan.id);
  };

  return (
    <article
      // 动态拼接 class
      // expanded 时额外添加 expandedCard 样式
      className={`${styles.card} ${expanded ? styles.expandedCard : ""}`}

      // 提高可访问性
      role="button"
      tabIndex={0}

      // aria-expanded 用于告诉辅助工具当前是否展开
      aria-expanded={expanded}

      // 点击整个卡片时切换展开状态
      onClick={() => setExpanded((current) => !current)}

      // 键盘控制
      // Enter 或 Space 也可以展开/收起
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {

          // 阻止空格默认滚动行为
          event.preventDefault();

          // 切换展开状态
          setExpanded((current) => !current);
        }
      }}
    >

      {/* 左侧警告图标区域 */}
      <div className={styles.iconWrap}>
        <AlertCircle size={24} strokeWidth={2.4} />
      </div>

      {/* 卡片主要内容区域 */}
      <div className={styles.content}>

        {/* 标题区域 */}
        <div className={styles.titleRow}>
          <div>

            {/* 计划标题 */}
            <h2>{plan.title}</h2>

            {/* 所属课程 */}
            <p>{plan.courseName}</p>
          </div>

          {/* 优先级 */}
          <span className={styles.priority}>
            {plan.priority}
          </span>
        </div>

        {/* 基本信息区域 */}
        <div className={styles.metaRow}>

          {/* 截止日期 */}
          <span>
            <CalendarDays size={16} strokeWidth={2.3} />
            Due {plan.dueDate}
          </span>

          {/* 剩余天数 */}
          <strong>{plan.daysLeft} days left</strong>

          {/* 当前状态 */}
          <span className={styles.status}>
            {plan.status}
          </span>
        </div>

        {/* expanded 为 true 时才显示详情 */}
        {expanded && (
          <div className={styles.detailsPanel}>

            {/* 计划描述 */}
            <p className={styles.description}>
              {plan.description}
            </p>

            {/* 详情信息网格 */}
            <div className={styles.detailGrid}>

              {/* 进度 */}
              <div>
                <span>Progress</span>
                <strong>{plan.progress}%</strong>
              </div>

              {/* 预计时间 */}
              <div>
                <span>Estimated time</span>
                <strong>{plan.estimatedTime}</strong>
              </div>

              {/* 所属学习方向 */}
              <div>
                <span>Track</span>
                <strong>{plan.owner}</strong>
              </div>

              {/* 最后更新时间 */}
              <div>
                <span>Last updated</span>
                <strong>{plan.lastUpdated}</strong>
              </div>
            </div>

            {/* 下一步计划 */}
            <div className={styles.nextSteps}>

              <h3>Next steps</h3>

              <ul>

                {/* 遍历 nextSteps 数组 */}
                {plan.nextSteps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* 底部操作区域 */}
        <div className={styles.actionRow}>

          {/* 展开/收起提示 */}
          <span className={styles.expandHint}>

            {/* 箭头图标 */}
            <ChevronDown
              className={expanded ? styles.chevronOpen : ""}
              size={16}
              strokeWidth={2.4}
            />

            {/* 根据 expanded 显示不同文字 */}
            {expanded ? "Hide details" : "View details"}
          </span>

          {/* 确认按钮 */}
          <button
            className={styles.ackButton}
            type="button"
            onClick={handleAcknowledge}
          >
            Got it
          </button>
        </div>
      </div>
    </article>
  );
}
