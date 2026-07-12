"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { InquiryForm } from "@/components/inquiry-form";
import type { FormKind } from "@/lib/form-validation";

type InquiryTab = {
  id: string;
  kind: FormKind;
  label: string;
  title: string;
  description: string;
};

const tabs: readonly InquiryTab[] = [
  {
    id: "buyer-inquiry",
    kind: "buyer",
    label: "Buyer Inquiry",
    title: "Buyer inquiry form",
    description:
      "For qualified buyers requesting sugar, wheat, wheat flour, sunflower oil, or fertilizer supply discussions."
  },
  {
    id: "supplier-partnership",
    kind: "supplier",
    label: "Supplier Partnership",
    title: "Supplier partnership form",
    description:
      "For producers, exporters, traders, and authorized representatives with verifiable product availability."
  }
];

export function InquiryTabs() {
  const idPrefix = useId();
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const activeIndex = tabs.findIndex((tab) => tab.id === activeTab);

  useEffect(() => {
    function activateFromHash() {
      const hash = window.location.hash.replace("#", "");
      const matchingTab = tabs.find((tab) => tab.id === hash);

      if (!matchingTab) {
        return;
      }

      setActiveTab(matchingTab.id);
      window.requestAnimationFrame(() => {
        document.getElementById(matchingTab.id)?.scrollIntoView({
          block: "start"
        });
      });
    }

    activateFromHash();
    window.addEventListener("hashchange", activateFromHash);

    return () => window.removeEventListener("hashchange", activateFromHash);
  }, []);

  function selectTab(tabId: string, index: number) {
    setActiveTab(tabId);
    tabRefs.current[index]?.focus();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const lastIndex = tabs.length - 1;
    let nextIndex = activeIndex;

    if (event.key === "ArrowRight") {
      nextIndex = activeIndex === lastIndex ? 0 : activeIndex + 1;
    } else if (event.key === "ArrowLeft") {
      nextIndex = activeIndex === 0 ? lastIndex : activeIndex - 1;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = lastIndex;
    } else {
      return;
    }

    event.preventDefault();
    selectTab(tabs[nextIndex].id, nextIndex);
  }

  return (
    <div className="mt-10 rounded-lg border border-forest-900/10 bg-warm-50 p-3 shadow-soft sm:p-4">
      <div
        aria-label="Inquiry forms"
        className="grid gap-2 sm:inline-grid sm:grid-cols-2"
        onKeyDown={handleKeyDown}
        role="tablist"
      >
        {tabs.map((tab, index) => {
          const selected = tab.id === activeTab;
          const tabId = `${idPrefix}-${tab.id}-tab`;

          return (
            <button
              aria-controls={tab.id}
              aria-selected={selected}
              className={`focus-ring min-h-11 rounded-lg px-4 py-3 text-sm font-semibold transition ${
                selected
                  ? "bg-forest-900 text-white shadow-soft"
                  : "bg-white text-navy-950 hover:bg-forest-900/5"
              }`}
              id={tabId}
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              role="tab"
              tabIndex={selected ? 0 : -1}
              type="button"
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {tabs.map((tab) => {
        const selected = tab.id === activeTab;
        const tabId = `${idPrefix}-${tab.id}-tab`;

        return (
          <div
            aria-labelledby={tabId}
            className="scroll-mt-24 pt-4"
            hidden={!selected}
            id={tab.id}
            key={tab.id}
            role="tabpanel"
          >
            <InquiryForm
              kind={tab.kind}
              title={tab.title}
              description={tab.description}
            />
          </div>
        );
      })}
    </div>
  );
}
