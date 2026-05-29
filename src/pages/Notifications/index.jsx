import { useMemo, useState } from "react";

import ExpiringPlanCard from "../../components/notifications/ExpiringPlanCard";
import PageShell from "../../components/profileLayout/PageShell";
import { useNotifications } from "./hooks/useNotifications";
import styles from "./Notifications.module.css";

const NOTIFICATIONS_PER_PAGE = 4;

export default function Notifications() {
  const [currentPage, setCurrentPage] = useState(1);
  const {
    acknowledgePlan,
    deletePlan,
    empty,
    error,
    expiringPlans,
    loading,
  } = useNotifications();
  const totalPages = Math.max(
    1,
    Math.ceil(expiringPlans.length / NOTIFICATIONS_PER_PAGE)
  );
  const activePage = Math.min(currentPage, totalPages);
  const pageStartIndex = (activePage - 1) * NOTIFICATIONS_PER_PAGE;
  const paginatedPlans = useMemo(
    () =>
      expiringPlans.slice(
        pageStartIndex,
        pageStartIndex + NOTIFICATIONS_PER_PAGE
      ),
    [expiringPlans, pageStartIndex]
  );
  const pageRangeStart = expiringPlans.length === 0 ? 0 : pageStartIndex + 1;
  const pageRangeEnd = Math.min(
    pageStartIndex + NOTIFICATIONS_PER_PAGE,
    expiringPlans.length
  );
  const shouldShowPagination = expiringPlans.length > NOTIFICATIONS_PER_PAGE;

  if (loading) {
    return (
      <PageShell showSubNav={false}>
        <main className={`${styles.notificationsPage} ${styles.pageStatus}`}>
          Loading notifications...
        </main>
      </PageShell>
    );
  }

  if (error) {
    return (
      <PageShell showSubNav={false}>
        <main className={`${styles.notificationsPage} ${styles.pageStatus}`}>
          Failed to load notifications
        </main>
      </PageShell>
    );
  }

  if (empty) {
    return (
      <PageShell showSubNav={false}>
        <main className={`${styles.notificationsPage} ${styles.pageStatus}`}>
          No expiring study plans
        </main>
      </PageShell>
    );
  }

  return (
    <PageShell showSubNav={false}>
      <main className={styles.notificationsPage}>
        <section className={styles.header}>
          <div>
            <h1>Notifications</h1>
            <p>Study plans that are getting close to their deadline.</p>
          </div>

          <span>{expiringPlans.length} expiring</span>
        </section>

        <section className={styles.planList}>
          {paginatedPlans.map((plan) => (
            <ExpiringPlanCard
              key={plan.id}
              onAcknowledge={acknowledgePlan}
              onDelete={deletePlan}
              plan={plan}
            />
          ))}
        </section>

        {shouldShowPagination && (
          <nav
            className={styles.pagination}
            aria-label="Notifications pagination"
          >
            <p>
              {pageRangeStart}-{pageRangeEnd} of {expiringPlans.length} alerts
            </p>

            <div className={styles.pageControls}>
              <button
                type="button"
                onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                disabled={activePage === 1}
                aria-label="Previous page"
              >
                Prev
              </button>

              {Array.from({ length: totalPages }, (_, index) => {
                const pageNumber = index + 1;

                return (
                  <button
                    key={pageNumber}
                    type="button"
                    className={
                      activePage === pageNumber ? styles.activePage : undefined
                    }
                    onClick={() => setCurrentPage(pageNumber)}
                    aria-current={
                      activePage === pageNumber ? "page" : undefined
                    }
                  >
                    {pageNumber}
                  </button>
                );
              })}

              <button
                type="button"
                onClick={() =>
                  setCurrentPage((page) => Math.min(totalPages, page + 1))
                }
                disabled={activePage === totalPages}
                aria-label="Next page"
              >
                Next
              </button>
            </div>
          </nav>
        )}
      </main>
    </PageShell>
  );
}
