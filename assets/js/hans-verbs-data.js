window.hansVerbsData = {
  replies: {
    intro: `
      <strong>Hans:</strong><br />
      Servus 😄 วันนี้ฉันจะช่วยคุณเรื่องกริยาเยอรมัน<br /><br />
      คุณถามฉันได้เกี่ยวกับ:
      verb คืออะไร, <strong>sein</strong>, <strong>haben</strong>, การเปลี่ยนรูปกริยา, examples และวิธีจำ
    `,

    what: `
      <strong>Hans:</strong><br />
      verb คือคำกริยา หรือคำที่บอกว่าใคร “ทำอะไร” หรือ “เป็นอะไร”<br /><br />
      ตัวอย่าง:<br />
      <strong>Ich lerne.</strong><br />
      <strong>Wir trinken Wasser.</strong><br /><br />
      ในสองประโยคนี้ <strong>lerne</strong> และ <strong>trinken</strong> คือกริยา
    `,

    sein: `
      <strong>Hans:</strong><br />
      <strong>sein</strong> แปลว่า เป็น / อยู่ / คือ<br /><br />
      เป็นกริยาที่สำคัญมาก เพราะใช้บ่อยในชีวิตจริง<br /><br />
      ตัวอย่าง:<br />
      <strong>Ich bin müde.</strong><br />
      ฉันเหนื่อย
    `,

    haben: `
      <strong>Hans:</strong><br />
      <strong>haben</strong> แปลว่า มี<br /><br />
      เป็นอีกคำที่ใช้บ่อยมาก และควรรู้เร็วที่สุดคำหนึ่ง<br /><br />
      ตัวอย่าง:<br />
      <strong>Du hast Zeit.</strong><br />
      คุณมีเวลา
    `,

    change: `
      <strong>Hans:</strong><br />
      จุดสำคัญมากคือ: เมื่อประธานเปลี่ยน กริยาก็มักเปลี่ยนด้วย<br /><br />
      ตัวอย่างกับ <strong>lernen</strong>:<br />
      <strong>ich lerne</strong><br />
      <strong>du lernst</strong><br />
      <strong>wir lernen</strong><br /><br />
      ดังนั้นอย่าจำกริยาแยกเดี่ยว ให้จำพร้อม subject
    `,

    example: `
      <strong>Hans:</strong><br />
      ตัวอย่างที่ใช้จริง:<br /><br />
      <strong>Ich bin müde.</strong><br />
      ฉันเหนื่อย<br /><br />
      <strong>Du hast Zeit.</strong><br />
      คุณมีเวลา<br /><br />
      <strong>Wir lernen Deutsch.</strong><br />
      พวกเราเรียนภาษาเยอรมัน
    `,

    learn: `
      <strong>Hans:</strong><br />
      วิธีเรียน verbs ที่ฉลาดคือ:<br /><br />
      <strong>1.</strong> จำความหมายของกริยา<br />
      <strong>2.</strong> ดูว่ามันเปลี่ยนกับ subject ยังไง<br />
      <strong>3.</strong> จำเป็น mini pattern เช่น <strong>ich lerne</strong>, <strong>du lernst</strong><br />
      <strong>4.</strong> เอาไปใส่ในประโยคสั้นทันที
    `,

    fallback: `
      <strong>Hans:</strong><br />
      ตอนนี้ฉันช่วยคุณเรื่อง verbs, sein, haben, การเปลี่ยนรูปกริยา และวิธีจำแบบฉลาด
    `
  },

  quickLabels: {
    what: "Verb คืออะไร?",
    sein: "sein?",
    haben: "haben?",
    change: "Verb changes?",
    example: "Examples?",
    learn: "How learn?"
  },

  intents: [
    { key: "what", keywords: ["verb", "กริยา", "คืออะไร", "was ist"] },
    { key: "sein", keywords: ["sein", "bin", "ist"] },
    { key: "haben", keywords: ["haben", "habe", "hast"] },
    { key: "change", keywords: ["change", "changes", "เปลี่ยน", "conjugation", "รูปกริยา"] },
    { key: "example", keywords: ["example", "examples", "ตัวอย่าง", "beispiel"] },
    { key: "learn", keywords: ["learn", "จำ", "how learn", "เรียนยังไง", "remember"] }
  ]
};