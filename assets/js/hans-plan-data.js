window.hansPlanData = {
  replies: {
    intro: `
      <strong>Hans:</strong><br />
      Servus 😄 วันนี้ฉันจะช่วยคุณเรื่องแผน 4 สัปดาห์<br /><br />
      คุณถามฉันได้เกี่ยวกับ:
      plan คืออะไร, week 1, week 2, week 3, week 4 และ daily routine
    `,

    what: `
      <strong>Hans:</strong><br />
      แผน 4 สัปดาห์คือการเอา lessons ทั้งหมดมาเรียงเป็นลำดับที่ฝึกได้จริง<br /><br />
      เป้าหมายคือ:
      ไม่เรียนมั่ว
      ไม่กระโดดข้ามขั้น
      และค่อย ๆ สร้างพื้นฐานให้แน่น
    `,

    week1: `
      <strong>Hans:</strong><br />
      <strong>Week 1</strong> เน้นฐาน:<br /><br />
      Sounds + Greetings<br /><br />
      คุณควรเริ่มจาก:
      ฟังเสียง, ทักทาย, พูดตาม, และจำ mini dialogues ง่าย ๆ
    `,

    week2: `
      <strong>Hans:</strong><br />
      <strong>Week 2</strong> เน้นการสร้างประโยค:<br /><br />
      Sentence Pattern + Articles<br /><br />
      เป้าหมายคือเริ่มเห็นว่า:
      ใคร + ทำอะไร + คำอะไรตามมา
    `,

    week3: `
      <strong>Hans:</strong><br />
      <strong>Week 3</strong> เน้นคำและกริยา:<br /><br />
      Vocabulary + Verbs<br /><br />
      ตรงนี้สำคัญมาก เพราะเริ่มเอาคำศัพท์จริงมาใส่ในโครงสร้างประโยค
    `,

    week4: `
      <strong>Hans:</strong><br />
      <strong>Week 4</strong> เน้นการใช้งาน:<br /><br />
      Questions + Dialogues + Listening<br /><br />
      ตรงนี้คือช่วงที่ภาษาเริ่ม “มีชีวิต” มากขึ้น เพราะคุณเริ่มถาม ตอบ ฟัง และใช้ scene จริง
    `,

    routine: `
      <strong>Hans:</strong><br />
      routine ที่ดีมากสำหรับทุกวันคือ:<br /><br />
      <strong>10 นาที</strong> ทบทวน<br />
      <strong>10 นาที</strong> ฟัง / อ่านออกเสียง<br />
      <strong>10 นาที</strong> พูด / สร้างประโยค<br /><br />
      สั้น แต่สม่ำเสมอ ดีกว่าหนักแล้วหยุด
    `,

    fallback: `
      <strong>Hans:</strong><br />
      ตอนนี้ฉันช่วยคุณเรื่องแผน 4 สัปดาห์, week 1–4 และ daily routine
    `
  },

  quickLabels: {
    what: "Plan คืออะไร?",
    week1: "Week 1?",
    week2: "Week 2?",
    week3: "Week 3?",
    week4: "Week 4?",
    routine: "Daily routine?"
  },

  intents: [
    { key: "what", keywords: ["plan", "4 week", "4-week", "แผน", "คืออะไร"] },
    { key: "week1", keywords: ["week 1", "สัปดาห์ 1", "sounds greetings"] },
    { key: "week2", keywords: ["week 2", "สัปดาห์ 2", "pattern articles"] },
    { key: "week3", keywords: ["week 3", "สัปดาห์ 3", "vocabulary verbs"] },
    { key: "week4", keywords: ["week 4", "สัปดาห์ 4", "questions dialogues listening"] },
    { key: "routine", keywords: ["routine", "daily", "ทุกวัน", "ฝึกทุกวัน"] }
  ]
};