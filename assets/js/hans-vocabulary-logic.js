window.hansVocabularyData = {
  replies: {
    intro: `
      <strong>Hans:</strong><br />
      Servus 😄 วันนี้ฉันจะช่วยคุณเรื่อง Mission Markt ใน Nürnberg<br /><br />
      เราจะเรียน:
      คำศัพท์บนตลาด,
      artikel + plural,
      คำกริยาที่ใช้พูดจริง,
      chunks สั้น ๆ
      และข้อผิดพลาดที่ผู้เรียนไทยมักเจอ
    `,

    markt: `
      <strong>Hans:</strong><br />
      บนตลาดใน Nürnberg เราไม่เรียนแค่คำเดี่ยว<br /><br />
      เราเรียนคำที่ใช้จริง เช่น:
      <strong>der Apfel</strong>,
      <strong>die Banane</strong>,
      <strong>der Preis</strong>,
      <strong>die Tüte</strong><br /><br />
      และต่อเข้ากับประโยคทันที
    `,

    artikel: `
      <strong>Hans:</strong><br />
      สำหรับผู้เรียนไทย เรื่อง <strong>der / die / das</strong> ยาก เพราะภาษาไทยไม่มีระบบนี้<br /><br />
      วิธีที่ฉลาดคือ:
      <strong>อย่าเรียน noun เดี่ยว</strong><br />
      ให้เรียนเป็น
      <strong>der Apfel – die Äpfel</strong><br />
      หรือ
      <strong>die Banane – die Bananen</strong>
    `,

    plural: `
      <strong>Hans:</strong><br />
      plural สำคัญมาก เพราะในเยอรมันไม่ใช่แค่ artikel เปลี่ยน
      บางทีตัวคำเองก็เปลี่ยนด้วย<br /><br />
      เช่น:
      <strong>der Apfel → die Äpfel</strong><br />
      <strong>die Orange → die Orangen</strong><br />
      <strong>der Stand → die Stände</strong>
    `,

    verb: `
      <strong>Hans:</strong><br />
      ถ้าคุณอยากเริ่มพูดเร็ว ให้เริ่มจากคำกริยาในรูป <strong>ich-form</strong><br /><br />
      เช่น:
      <strong>ich möchte</strong>,
      <strong>ich nehme</strong>,
      <strong>ich kaufe</strong>,
      <strong>ich brauche</strong><br /><br />
      แบบนี้เอาไปใช้บนตลาดได้ทันที
    `,

    chunk: `
      <strong>Hans:</strong><br />
      อย่าจำแค่คำศัพท์เดี่ยว ๆ<br /><br />
      ให้จำเป็นก้อนคำ เช่น:
      <strong>Ich möchte zwei Äpfel.</strong><br />
      <strong>Was kostet das?</strong><br />
      <strong>Haben Sie Bananen?</strong><br /><br />
      แบบนี้ช่วยให้พูดได้จริงเร็วกว่าเยอะ
    `,

    mistake: `
      <strong>Hans:</strong><br />
      ข้อผิดพลาดที่ผู้เรียนไทยมักเจอคือ:<br /><br />
      <strong>1.</strong> ลืม artikel<br />
      <strong>2.</strong> จำ noun เดี่ยว ไม่มี plural<br />
      <strong>3.</strong> เอา article รูปพื้นฐานไปใช้ทุกประโยค<br /><br />
      เช่น:
      <strong>Ich kaufe der Apfel</strong> ❌<br />
      <strong>Ich kaufe den Apfel</strong> ✅
    `,

    thai: `
      <strong>Hans:</strong><br />
      Thai lauthilfe ช่วยได้มากในช่วงเริ่มต้น<br /><br />
      เช่น:
      <strong>Ich möchte</strong> → อิค เมิคเทอะ<br />
      <strong>Was kostet das?</strong> → วาส คอสเท็ท ดาส<br /><br />
      แต่มันเป็นแค่สะพานเท่านั้น
      ภายหลัง audio จะช่วยได้แม่นกว่า
    `,

    fallback: `
      <strong>Hans:</strong><br />
      ตอนนี้ฉันช่วยคุณเรื่องตลาดใน Nürnberg, artikel + plural,
      ich-form verbs, chunks และความผิดพลาดที่ผู้เรียนไทยมักเจอ
    `
  },

  quickLabels: {
    markt: "Markt?",
    artikel: "Artikel?",
    plural: "Plural?",
    verb: "Verben?",
    chunk: "Chunks?",
    mistake: "Fehler?"
  },

  intents: [
    { key: "markt", keywords: ["markt", "market", "ตลาด", "nürnberg", "nuernberg", "apfel", "banane"] },
    { key: "artikel", keywords: ["artikel", "der", "die", "das", "gender", "genus"] },
    { key: "plural", keywords: ["plural", "mehrzahl", "หลาย", "äpfel", "bananen"] },
    { key: "verb", keywords: ["verb", "verben", "ich möchte", "ich nehme", "ich kaufe", "กริยา"] },
    { key: "chunk", keywords: ["chunk", "satz", "ประโยค", "was kostet", "haben sie", "ich möchte"] },
    { key: "mistake", keywords: ["mistake", "fehler", "ผิด", "falsch", "akku", "akkusativ"] },
    { key: "thai", keywords: ["thai", "lautschrift", "aussprechen", "ออกเสียง", "อ่านยังไง"] }
  ]
};