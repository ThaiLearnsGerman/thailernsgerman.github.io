const SUPABASE_URL = "https://vtfodfeaepswndyrhkjv.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_osHx_EQr3AQqmPrQRjihGA_Lq8K3ycE";

const lessonsContainer = document.getElementById("lessonsContainer");

async function loadLessons() {
  try {
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/published_lessons?select=title,hook,mini_lesson,cta,channel,status,published_at&status=eq.live&order=published_at.desc`,
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

    if (!lessons.length) {
      lessonsContainer.innerHTML = `<p>No live lessons yet.</p>`;
      return;
    }

    lessonsContainer.innerHTML = lessons
  .map(
    (lesson) => `
      <article class="lesson-card">
        <div class="lesson-meta">
          <span class="lesson-tag">${lesson.channel || "tiktok"}</span>
          <span>${lesson.status || "live"}</span>
        </div>
        <h2>${lesson.title || "Untitled lesson"}</h2>
        <p class="lesson-hook"><strong>Hook:</strong> ${lesson.hook || ""}</p>
        <p class="lesson-body">${lesson.mini_lesson || ""}</p>
        <p class="lesson-cta">${lesson.cta || ""}</p>
      </article>
    `
  )
  .join("");
  } catch (error) {
    console.error("Error loading lessons:", error);
    lessonsContainer.innerHTML = `<p>Could not load lessons.</p>`;
  }
}

loadLessons();
