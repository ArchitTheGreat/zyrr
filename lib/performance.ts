// Performance monitoring utilities for Zyrr Gallery

interface PerformanceMetrics {
  navigation: PerformanceNavigationTiming;
  paint: PerformancePaintTiming[];
  resource: PerformanceResourceTiming[];
  lighthouse: {
    cls: number;
    fid: number;
    lcp: number;
    ttfb: number;
    fcp: number;
  };
}

class PerformanceMonitor {
  private metrics: PerformanceMetrics;
  private observers: PerformanceObserver[] = [];
  private startTime: number;

  constructor() {
    this.startTime = performance.now();
    this.metrics = {
      navigation: {} as PerformanceNavigationTiming,
      paint: [],
      resource: [],
      lighthouse: {
        cls: 0,
        fid: 0,
        lcp: 0,
        ttfb: 0,
        fcp: 0
      }
    };
  }

  init() {
    this.collectNavigationMetrics();
    this.collectPaintMetrics();
    this.collectResourceMetrics();
    this.collectLighthouseMetrics();
    this.setupObservers();
  }

  private collectNavigationMetrics() {
    if ('performance' in window && 'getEntriesByType' in performance) {
      const navigation = performance.getEntriesByType('navigation')[0] as any;
      this.metrics.navigation = navigation;
    }
  }

  private collectPaintMetrics() {
    if ('performance' in window && 'getEntriesByType' in performance) {
      const paintEntries = performance.getEntriesByType('paint');
      this.metrics.paint = paintEntries as any[];
    }
  }

  private collectResourceMetrics() {
    if ('performance' in window && 'getEntriesByType' in performance) {
      const resourceEntries = performance.getEntriesByType('resource');
      this.metrics.resource = resourceEntries as any[];
    }
  }

  private collectLighthouseMetrics() {
    // CLS (Cumulative Layout Shift)
    if ('PerformanceObserver' in window) {
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const layoutShiftEntry = entry as any;
          if (layoutShiftEntry.entryType === 'layout-shift' && !layoutShiftEntry.hadRecentInput) {
            this.metrics.lighthouse.cls += layoutShiftEntry.value;
          }
        }
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
      this.observers.push(clsObserver);
    }

    // FID (First Input Delay)
    if ('PerformanceObserver' in window) {
      const fidObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const firstInputEntry = entry as any;
          this.metrics.lighthouse.fid = Math.round(firstInputEntry.processingStart - firstInputEntry.startTime);
        }
      });
      fidObserver.observe({ entryTypes: ['first-input'] });
      this.observers.push(fidObserver);
    }

    // LCP (Largest Contentful Paint)
    if ('PerformanceObserver' in window) {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as any;
        this.metrics.lighthouse.lcp = Math.round(lastEntry.startTime);
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      this.observers.push(lcpObserver);
    }
  }

  private setupObservers() {
    // Resource loading performance
    if ('PerformanceObserver' in window) {
      const resourceObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const resource = entry as any;
          if (resource.duration > 1000) {
            console.warn(`Slow resource: ${resource.name} took ${Math.round(resource.duration)}ms`);
          }
        }
      });
      resourceObserver.observe({ entryTypes: ['resource'] });
      this.observers.push(resourceObserver);
    }

    // Memory usage monitoring
    if ('memory' in performance) {
      setInterval(() => {
        const memory = (performance as any).memory;
        if (memory && memory.usedJSHeapSize > memory.jsHeapSizeLimit * 0.8) {
          console.warn('High memory usage detected:', {
            used: Math.round(memory.usedJSHeapSize / 1048576) + 'MB',
            total: Math.round(memory.totalJSHeapSize / 1048576) + 'MB',
            limit: Math.round(memory.jsHeapSizeLimit / 1048576) + 'MB'
          });
        }
      }, 5000);
    }
  }

  getMetrics(): PerformanceMetrics {
    return this.metrics;
  }

  getPerformanceScore(): { score: number; breakdown: any } {
    const { lighthouse } = this.metrics;
    
    // Calculate performance score (0-100)
    let score = 100;
    const breakdown: any = {};

    // Deduct points for poor metrics
    if (lighthouse.lcp > 4000) {
      score -= 30;
      breakdown.lcp = 'Poor';
    } else if (lighthouse.lcp > 2500) {
      score -= 15;
      breakdown.lcp = 'Needs Improvement';
    } else {
      breakdown.lcp = 'Good';
    }

    if (lighthouse.fid > 300) {
      score -= 20;
      breakdown.fid = 'Poor';
    } else if (lighthouse.fid > 100) {
      score -= 10;
      breakdown.fid = 'Needs Improvement';
    } else {
      breakdown.fid = 'Good';
    }

    if (lighthouse.cls > 0.25) {
      score -= 20;
      breakdown.cls = 'Poor';
    } else if (lighthouse.cls > 0.1) {
      score -= 10;
      breakdown.cls = 'Needs Improvement';
    } else {
      breakdown.cls = 'Good';
    }

    return {
      score: Math.max(0, Math.round(score)),
      breakdown
    };
  }

  logMetrics() {
    const metrics = this.getMetrics();
    const score = this.getPerformanceScore();

    console.group('🚀 Performance Metrics');
    console.log('Navigation:', {
      domContentLoaded: (metrics.navigation as any).domContentLoadedEventEnd - (metrics.navigation as any).domContentLoadedEventStart,
      loadComplete: (metrics.navigation as any).loadEventEnd - (metrics.navigation as any).loadEventStart,
      totalLoadTime: (metrics.navigation as any).loadEventEnd - (metrics.navigation as any).startTime
    });

    console.log('Paint:', {
      firstPaint: (metrics.paint.find(p => p.name === 'first-paint') as any)?.startTime,
      firstContentfulPaint: (metrics.paint.find(p => p.name === 'first-contentful-paint') as any)?.startTime
    });

    console.log('Resource:', {
      totalResources: metrics.resource.length,
      slowResources: metrics.resource.filter(r => (r as any).duration > 1000).length
    });

    console.log('Lighthouse Metrics:', metrics.lighthouse);
    console.log('Performance Score:', `${score.score}/100`, score.breakdown);
    console.groupEnd();
  }

  cleanup() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
  }
}

// Global performance monitor instance
export const performanceMonitor = new PerformanceMonitor();

// Initialize performance monitoring
if (typeof window !== 'undefined') {
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      performanceMonitor.init();
    });
  } else {
    performanceMonitor.init();
  }

  // Log metrics when page is hidden
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      performanceMonitor.logMetrics();
    }
  });

  // Log metrics on page unload
  window.addEventListener('beforeunload', () => {
    performanceMonitor.logMetrics();
    performanceMonitor.cleanup();
  });
}

// Web Vitals reporting
export function reportWebVitals(metric: any) {
  if (metric.label === 'web-vital') {
    console.log(`${metric.name}:`, metric.value, metric.delta);
    
    // Send to analytics service (placeholder)
    // analytics.send({
    //   name: metric.name,
    //   value: metric.value,
    //   delta: metric.delta,
    //   id: metric.id
    // });
  }
}

// Performance budget checking
export function checkPerformanceBudget() {
  const metrics = performanceMonitor.getMetrics();
  const budget = {
    lcp: 2500, // 2.5s
    fid: 100,  // 100ms
    cls: 0.1,  // 0.1
    ttfb: 600  // 600ms
  };

  const violations: string[] = [];

  if (metrics.lighthouse.lcp > budget.lcp) {
    violations.push(`LCP (${metrics.lighthouse.lcp}ms) exceeds budget (${budget.lcp}ms)`);
  }

  if (metrics.lighthouse.fid > budget.fid) {
    violations.push(`FID (${metrics.lighthouse.fid}ms) exceeds budget (${budget.fid}ms)`);
  }

  if (metrics.lighthouse.cls > budget.cls) {
    violations.push(`CLS (${metrics.lighthouse.cls}) exceeds budget (${budget.cls})`);
  }

  if (metrics.lighthouse.ttfb > budget.ttfb) {
    violations.push(`TTFB (${Math.round(metrics.lighthouse.ttfb)}ms) exceeds budget (${budget.ttfb}ms)`);
  }

  if (violations.length > 0) {
    console.warn('🚨 Performance Budget Violations:', violations);
    return false;
  }

  console.log('✅ All performance budgets met');
  return true;
}

// Export for use in components
export default performanceMonitor;