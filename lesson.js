const SUPABASE_URL = "https://vtfodfeaepswndyrhkjv.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_osHx_EQr3AQqmPrQRjihGA_Lq8K3ycE";

const lessonDetailContainer = document.getElementById("lessonDetailContainer");

function getLessonIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

async function loadLessonDetail() {
  const lessonId = getLessonIdFromUrl();

  if (!lessonId) {
    lessonDetailContainer.innerHTML = `<p>Lesson not found.</p>`;
    return;
  }

  try {
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/published_lessons?id=eq.${lessonId}&select=*`,
      {
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    const lessons = await response.json();
    const lesson = lessons[0];

    if (!lesson) {
      lessonDetailContainer.innerHTML = `<p>Lesson not found.</p>`;
      return;
    }

    const formattedDate = lesson.published_at
      ? new Date(lesson.published_at).toLocaleDateString("en-GB")
      : "Recently published";

    lessonDetailContainer.innerHTML = `
  <article class="lesson-detail-card">
    <div class="lesson-detail-hero">
      <div class="lesson-detail-hero-badge">Live Lesson</div>
      <div class="lesson-detail-hero-icon">🎓</div>
      <h1>${lesson.title || "Untitled lesson"}</h1>
      <p class="lesson-detail-date">${formattedDate}</p>
      <p class="lesson-detail-intro">
        A focused lesson page generated from your live content system for Thai learners who want simple and clear German learning.
      </p>
    </div>

    <div class="lesson-meta">
      <span class="lesson-tag">${lesson.channel || "tiktok"}</span>
      <span>${lesson.status || "live"}</span>
    </div>

    <section class="lesson-detail-section">
      <h3>Hook</h3>
      <p>${lesson.hook || ""}</p>
    </section>

    <section class="lesson-detail-section">
      <h3>Mini lesson</h3>
      <p>${lesson.mini_lesson || ""}</p>
    </section>

    <section class="lesson-detail-section">
      <h3>CTA</h3>
      <p>${lesson.cta || ""}</p>
    </section>

    <div class="lesson-detail-actions">
      <a class="lesson-back-btn" href="lessons.html">← Back to lessons</a>
    </div>
  </article>
`;
  } catch (error) {
    console.error("Error loading lesson detail:", error);
    lessonDetailContainer.innerHTML = `<p>Could not load lesson.</p>`;
  }
}

loadLessonDetail();
