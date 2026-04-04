window.hansVocabularyData = {
  replies: {
    intro: `
      <strong>Hans:</strong><br />
      Servus 😄 วันนี้ฉันจะช่วยคุณเรื่อง vocabulary แบบฉลาด<br /><br />
      คุณถามฉันได้เกี่ยวกับ:
      vocabulary คืออะไร, ทำไมต้องเรียนเป็นกลุ่ม, article + word, กลุ่มคำ people, daily things และวิธีจำ
    `,

    what: `
      <strong>Hans:</strong><br />
      vocabulary ก็คือคำศัพท์ แต่ในบทนี้เราไม่ได้เรียนแบบสุ่ม<br /><br />
      เราเรียนคำที่:
      <strong>ใช้จริง</strong>,
      <strong>อยู่เป็นกลุ่ม</strong>,
      และ <strong>ต่อเข้ากับ pattern ที่คุณเรียนมาแล้วได้</strong>
    `,

    group: `
      <strong>Hans:</strong><br />
      ถ้าเรียนคำเป็นกลุ่ม สมองจะจำง่ายกว่าเรียนแบบสุ่มมาก<br /><br />
      เช่น:
      <strong>der Mann / die Frau / das Kind</strong><br /><br />
      แบบนี้คุณไม่ได้จำแค่คำ
      แต่จำทั้ง “หมวดความหมาย” และ article ไปพร้อมกัน
    `,

    article: `
      <strong>Hans:</strong><br />
      วิธีที่ฉลาดกว่าคือ:
      อย่าจำแค่ <strong>Mann</strong><br />
      ให้จำเป็น <strong>der Mann</strong><br /><br />
      อย่าจำแค่ <strong>Sprache</strong><br />
      ให้จำเป็น <strong>die Sprache</strong><br /><br />
      เพราะในอนาคตคุณจะใช้คำเหล่านี้ในประโยค
    `,

    people: `
      <strong>Hans:</strong><br />
      กลุ่ม People ที่ควรรู้ก่อน:<br /><br />
      <strong>der Mann</strong> = ผู้ชาย<br />
      <strong>die Frau</strong> = ผู้หญิง<br />
      <strong>das Kind</strong> = เด็ก<br /><br />
      กลุ่มนี้ดีเพราะใช้บ่อย และช่วยให้คุณเริ่มเห็น article ต่างกันได้ชัด
    `,

    daily: `
      <strong>Hans:</strong><br />
      กลุ่ม Daily things ที่ดีสำหรับผู้เริ่มต้น:<br /><br />
      <strong>das Wasser</strong> = น้ำ<br />
      <strong>das Brot</strong> = ขนมปัง<br />
      <strong>das Haus</strong> = บ้าน<br /><br />
      คำแบบนี้เอาไปต่อเป็นประโยคง่าย ๆ ได้เร็ว
    `,

    learn: `
      <strong>Hans:</strong><br />
      วิธีเรียน vocabulary ที่ฉลาดคือ:<br /><br />
      <strong>1.</strong> จำเป็นกลุ่ม<br />
      <strong>2.</strong> จำ article ไปพร้อมคำ<br />
      <strong>3.</strong> ดูตัวอย่างประโยคทันที<br />
      <strong>4.</strong> ทบทวนคำที่ใช้จริงก่อนคำแปลก ๆ<br /><br />
      เป้าหมายไม่ใช่รู้เยอะที่สุด แต่คือใช้ได้จริงเร็วที่สุด
    `,

    fallback: `
      <strong>Hans:</strong><br />
      ตอนนี้ฉันช่วยคุณเรื่อง vocabulary, article + word, การเรียนคำเป็นกลุ่ม และวิธีจำแบบฉลาด
    `
  },

  quickLabels: {
    what: "Vocabulary คืออะไร?",
    group: "Why groups?",
    article: "Article + word?",
    people: "People words?",
    daily: "Daily words?",
    learn: "How learn?"
  },

  intents: [
    { key: "what", keywords: ["vocabulary", "คำศัพท์", "คืออะไร", "wortschatz"] },
    { key: "group", keywords: ["group", "groups", "กลุ่ม", "grouped"] },
    { key: "article", keywords: ["article", "พร้อม article", "der die das", "word with article"] },
    { key: "people", keywords: ["people", "คน", "mann", "frau", "kind"] },
    { key: "daily", keywords: ["daily", "ของใช้", "water", "brot", "haus", "wasser"] },
    { key: "learn", keywords: ["learn", "จำ", "how learn", "remember", "เรียนยังไง"] }
  ]
};