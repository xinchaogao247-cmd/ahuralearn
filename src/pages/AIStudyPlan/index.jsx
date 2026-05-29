import { useEffect, useRef, useState } from "react";
import { Bot, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";

import GeneratedPlanPreview from "../../components/aiStudyPlan/GeneratedPlanPreview";
import PageShell from "../../components/common/PageShell";
import { useAIStudyPlan } from "./hooks/useAIStudyPlan";
import styles from "./AIStudyPlan.module.css";

export default function AIStudyPlan() {
  const navigate = useNavigate();
  const { data, loading, error, empty } = useAIStudyPlan();
  const [answer, setAnswer] = useState("");
  const [messages, setMessages] = useState([]);
  const [isResponding, setIsResponding] = useState(false);
  const [previewHeight, setPreviewHeight] = useState(null);
  const messageIdRef = useRef(0);
  const responseTimerRef = useRef(null);
  const previewCardRef = useRef(null);

  useEffect(() => {
    return () => {
      window.clearTimeout(responseTimerRef.current);
    };
  }, []);

  useEffect(() => {
    const previewCard = previewCardRef.current;

    if (!previewCard) {
      return undefined;
    }

    const updatePreviewHeight = () => {
      setPreviewHeight(previewCard.getBoundingClientRect().height);
    };

    updatePreviewHeight();

    const resizeObserver = new ResizeObserver(updatePreviewHeight);
    resizeObserver.observe(previewCard);

    return () => {
      resizeObserver.disconnect();
    };
  }, [data]);

  if (loading) {
    return (
      <PageShell showSubNav={false}>
        <main className={`${styles.aiStudyPlanPage} ${styles.pageStatus}`}>
          Loading AI study plan...
        </main>
      </PageShell>
    );
  }

  if (error) {
    return (
      <PageShell showSubNav={false}>
        <main className={`${styles.aiStudyPlanPage} ${styles.pageStatus}`}>
          Failed to load AI study plan
        </main>
      </PageShell>
    );
  }

  if (empty) {
    return (
      <PageShell showSubNav={false}>
        <main className={`${styles.aiStudyPlanPage} ${styles.pageStatus}`}>
          No generated plan found
        </main>
      </PageShell>
    );
  }

  const displayedMessages = messages.length > 0 ? messages : [data.chat[0]];
  const aiReplies = data.chat.filter((message) => message.role === "ai").slice(1);
  const userMessageCount = displayedMessages.filter(
    (message) => message.role === "user"
  ).length;
  const showSuggestions = userMessageCount > 0;

  const addUserAnswer = (answerText) => {
    const text = answerText.trim();

    if (!text || isResponding) {
      return;
    }

    const currentMessages = messages.length > 0 ? messages : [data.chat[0]];
    const currentUserMessageCount = currentMessages.filter(
      (message) => message.role === "user"
    ).length;
    messageIdRef.current += 1;
    const userMessageId = `user-${messageIdRef.current}`;
    messageIdRef.current += 1;
    const aiMessageId = `ai-${messageIdRef.current}`;

    const nextAiReply = aiReplies[currentUserMessageCount] ?? {
      id: aiMessageId,
      role: "ai",
      text: "Great, I have enough information to generate your study plan. Review the plan preview and create it when you're ready.",
      meta: "AI Assistant - Just now",
    };

    setMessages([
      ...currentMessages,
      {
        id: userMessageId,
        role: "user",
        text,
        meta: "You - Just now",
      },
    ]);
    setAnswer("");
    setIsResponding(true);

    responseTimerRef.current = window.setTimeout(() => {
      setMessages((current) => [
        ...current,
        {
          ...nextAiReply,
          id: aiMessageId,
          meta: "AI Assistant - Just now",
        },
      ]);
      setIsResponding(false);
    }, 650);
  };

  const handleSubmitAnswer = (event) => {
    event.preventDefault();
    addUserAnswer(answer);
  };

  const canSend = answer.trim().length > 0 && !isResponding;

  return (
    //隐藏二级导航栏，因为这个页面不需要展示二级导航
    <PageShell showSubNav={false}>
      <main className={styles.aiStudyPlanPage}>
        <section className={styles.pageHeader}>
          <h1>Build Your Study Plan</h1>
          <p>Let's tailor your learning journey with our AI architect.</p>
        </section>

        <section className={styles.builderLayout}>
          <div
            className={styles.chatCard}
            style={
              previewHeight
                ? { "--preview-card-height": `${previewHeight}px` }
                : undefined
            }
          >
            <div className={styles.chatList}>
              {displayedMessages.map((message) => (
                <div
                  className={`${styles.messageRow} ${
                    message.role === "user" ? styles.userMessageRow : ""
                  }`}
                  key={message.id}
                >
                  {message.role === "ai" && (
                    <div className={styles.botIcon}>
                      <Bot size={18} strokeWidth={2.4} />
                    </div>
                  )}

                  <div>
                    <p
                      className={`${styles.messageBubble} ${
                        message.role === "user" ? styles.userBubble : ""
                      }`}
                    >
                      {message.text}
                    </p>
                    <span className={styles.messageMeta}>{message.meta}</span>
                  </div>

                  {message.role === "user" && <div className={styles.userDot} />}
                </div>
              ))}

              {isResponding && (
                <div className={styles.messageRow}>
                  <div className={styles.botIcon}>
                    <Bot size={18} strokeWidth={2.4} />
                  </div>
                  <p className={`${styles.messageBubble} ${styles.typingBubble}`}>
                    Thinking...
                  </p>
                </div>
              )}
            </div>

            {showSuggestions && (
              <div className={styles.suggestionsBlock}>
                <span>AI Suggestions</span>
                <div className={styles.suggestionChips}>
                  {data.suggestions.map((suggestion) => (
                    <button
                      type="button"
                      key={suggestion}
                      disabled={isResponding}
                      onClick={() => addUserAnswer(suggestion)}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <form className={styles.answerBar} onSubmit={handleSubmitAnswer}>
              <input
                disabled={isResponding}
                value={answer}
                onChange={(event) => setAnswer(event.target.value)}
                placeholder="Type your answer here..."
              />
              <button type="submit" aria-label="Send answer" disabled={!canSend}>
                <Send size={18} strokeWidth={2.6} />
              </button>
            </form>
          </div>

          <div ref={previewCardRef}>
            <GeneratedPlanPreview
              aiLogs={data.aiLogs}
              modules={data.recommendedModules}
              onCreatePlan={() => navigate("/learning-plan")}
            />
          </div>
        </section>
      </main>
    </PageShell>
  );
}
