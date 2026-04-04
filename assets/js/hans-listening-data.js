window.hansListeningData = {
  replies: {
    intro: `
      <strong>Hans:</strong><br />
      Servus 😄 วันนี้ฉันจะช่วยคุณเรื่อง listening ภาษาเยอรมัน<br /><br />
      คุณถามฉันได้เกี่ยวกับ:
      listening คืออะไร, ต้องฟังอะไรก่อน, scene listening, ฟังไม่ออกทำยังไง, วิธีฝึก และเป้าหมาย
    `,

    what: `
      <strong>Hans:</strong><br />
      listening ไม่ได้แปลว่าคุณต้องฟังออกทุกคำทันที<br /><br />
      สำหรับผู้เริ่มต้น สิ่งสำคัญคือ:
      จับคำที่คุ้น, จับสถานการณ์, และเข้าใจภาพรวม
    `,

    focus: `
      <strong>Hans:</strong><br />
      เวลาเริ่มฟัง ให้โฟกัส 3 อย่างก่อน:<br /><br />
      <strong>1.</strong> คำที่คุณรู้แล้ว<br />
      <strong>2.</strong> mood หรือสถานการณ์<br />
      <strong>3.</strong> information หลัก<br /><br />
      แบบนี้จะง่ายกว่าพยายามแปลทุกคำ
    `,

    scene: `
      <strong>Hans:</strong><br />
      scene listening คือการฟังบทสนทนาสั้น ๆ แล้วพยายามเข้าใจว่าเกิดอะไรขึ้น<br /><br />
      เช่น scene ทักทาย:<br />
      <strong>Hallo! Wie geht’s?</strong><br />
      คุณไม่จำเป็นต้องจับทุกคำ แค่รู้ว่านี่คือการ greet และถามสารทุกข์ก็ถือว่าดีมากแล้ว
    `,

    panic: `
      <strong>Hans:</strong><br />
      ถ้าฟังไม่ออกทุกคำ อย่าตกใจ นี่เป็นเรื่องปกติมากสำหรับผู้เริ่มต้น<br /><br />
      เป้าหมายไม่ใช่ความสมบูรณ์แบบ แต่คือค่อย ๆ ฟังออกมากขึ้นทีละนิด
    `,

    method: `
      <strong>Hans:</strong><br />
      วิธีฝึก listening ที่ฉลาดคือ:<br /><br />
      <strong>1.</strong> ฟังรอบแรกเพื่อจับ scene<br />
      <strong>2.</strong> ฟังรอบสองเพื่อจับคำสำคัญ<br />
      <strong>3.</strong> ฟังรอบสามเพื่อเข้าใจ flow<br /><br />
      อย่ากดดันตัวเองเกินไป
    `,

    goal: `
      <strong>Hans:</strong><br />
      เป้าหมายของบทนี้คือ:<br /><br />
      <strong>1.</strong> ฟังแล้วไม่ panic<br />
      <strong>2.</strong> จับคำที่คุ้นได้<br />
      <strong>3.</strong> เข้าใจ scene โดยรวม<br /><br />
      นี่คือฐานที่ดีมากสำหรับ dialogue และ speaking
    `,

    fallback: `
      <strong>Hans:</strong><br />
      ตอนนี้ฉันช่วยคุณเรื่อง listening, วิธีฟัง, การจับคำสำคัญ และการเข้าใจ scene แบบง่าย ๆ
    `
  },

  quickLabels: {
    what: "Listening คืออะไร?",
    focus: "ฟังอะไรก่อน?",
    scene: "scene listening?",
    panic: "ฟังไม่ออกทำไง?",
    method: "How practise?",
    goal: "Goal?"
  },

  intents: [
    { key: "what", keywords: ["listening", "ฟัง", "คืออะไร", "hören"] },
    { key: "focus", keywords: ["focus", "ฟังอะไร", "คำสำคัญ", "important words"] },
    { key: "scene", keywords: ["scene", "dialogue", "บทสนทนา", "scene listening"] },
    { key: "panic", keywords: ["panic", "ฟังไม่ออก", "ไม่ได้ยิน", "ไม่เข้าใจ"] },
    { key: "method", keywords: ["method", "practice", "ฝึก", "how practise", "learn"] },
    { key: "goal", keywords: ["goal", "เป้าหมาย", "target"] }
  ]
};