window.hansQuestionsData = {
  replies: {
    intro: `
      <strong>Hans:</strong><br />
      Servus 😄 วันนี้ฉันจะช่วยคุณเรื่องคำถามภาษาเยอรมัน<br /><br />
      คุณถามฉันได้เกี่ยวกับ:
      question คืออะไร, W-questions, yes/no questions, <strong>wie</strong>, <strong>wo</strong> และวิธีเรียน
    `,

    what: `
      <strong>Hans:</strong><br />
      question ก็คือประโยคคำถาม หรือประโยคที่ใช้ถามข้อมูลหรือถามว่าใช่/ไม่ใช่<br /><br />
      ในเยอรมันมี 2 แบบสำคัญมาก:
      <strong>W-questions</strong> และ <strong>yes / no questions</strong>
    `,

    wquestion: `
      <strong>Hans:</strong><br />
      W-question คือคำถามที่เริ่มด้วยคำถามเฉพาะ เช่น:<br /><br />
      <strong>wie</strong> = อย่างไร<br />
      <strong>wo</strong> = ที่ไหน<br />
      <strong>was</strong> = อะไร<br /><br />
      ตัวอย่าง:<br />
      <strong>Wo wohnst du?</strong><br />
      คุณอยู่ที่ไหน
    `,

    yesno: `
      <strong>Hans:</strong><br />
      yes / no question คือคำถามที่ตอบได้ด้วย ใช่ / ไม่ใช่<br /><br />
      ในเยอรมัน คำถามแบบนี้มักเริ่มด้วยกริยา<br /><br />
      ตัวอย่าง:<br />
      <strong>Hast du Zeit?</strong><br />
      คุณมีเวลาไหม
    `,

    wie: `
      <strong>Hans:</strong><br />
      <strong>wie</strong> มักใช้ถามว่า “อย่างไร” หรือใช้ในคำถามพื้นฐานบางแบบ<br /><br />
      ตัวอย่าง:<br />
      <strong>Wie heißt du?</strong><br />
      คุณชื่ออะไร<br /><br />
      <strong>Wie geht’s?</strong><br />
      สบายดีไหม
    `,

    wo: `
      <strong>Hans:</strong><br />
      <strong>wo</strong> แปลว่า “ที่ไหน”<br /><br />
      ตัวอย่าง:<br />
      <strong>Wo wohnst du?</strong><br />
      คุณอยู่ที่ไหน<br /><br />
      ใช้เมื่อต้องการถามสถานที่
    `,

    learn: `
      <strong>Hans:</strong><br />
      วิธีเรียน questions ที่ฉลาดคือ:<br /><br />
      <strong>1.</strong> แยกให้ออกก่อนว่าเป็น W-question หรือ yes/no<br />
      <strong>2.</strong> จำคำถามสั้น ๆ ที่ใช้จริงก่อน<br />
      <strong>3.</strong> ดูลำดับคำให้ชัด<br />
      <strong>4.</strong> ฝึกถามประโยคสั้นบ่อย ๆ
    `,

    fallback: `
      <strong>Hans:</strong><br />
      ตอนนี้ฉันช่วยคุณเรื่องคำถามภาษาเยอรมัน, W-questions, yes/no questions และการเรียงคำ
    `
  },

  quickLabels: {
    what: "Question คืออะไร?",
    wquestion: "W-question?",
    yesno: "Yes / No?",
    wie: "Wie?",
    wo: "Wo?",
    learn: "How learn?"
  },

  intents: [
    { key: "what", keywords: ["question", "questions", "คำถาม", "คืออะไร", "frage"] },
    { key: "wquestion", keywords: ["w-question", "w questions", "wie was wo", "เฉพาะ"] },
    { key: "yesno", keywords: ["yes", "no", "yes/no", "ใช่ไม่ใช่"] },
    { key: "wie", keywords: ["wie", "wie heißt", "wie geht"] },
    { key: "wo", keywords: ["wo", "wo wohnst"] },
    { key: "learn", keywords: ["learn", "เรียน", "how learn", "จำ", "remember"] }
  ]
};