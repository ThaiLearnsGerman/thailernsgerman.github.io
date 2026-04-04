window.hansSoundsData = {
  replies: {
    intro: `
      <strong>Hans:</strong><br />
      Servus 😄 วันนี้ฉันจะช่วยคุณเรื่องเสียงภาษาเยอรมัน<br /><br />
      คุณถามฉันได้เรื่อง:<br />
      <strong>Ä</strong>, <strong>Ö</strong>, <strong>Ü</strong>, <strong>ß</strong>, วิธีฝึก และความต่างของเสียง
    `,

    ae: `
      <strong>Hans:</strong><br />
      <strong>Ä</strong> มักฟังคล้ายเสียง <strong>“แอ”</strong><br />
      แต่ควรออกเสียงให้สั้นและชัด<br /><br />
      <strong>ตัวอย่าง:</strong><br />
      <strong>Mädchen</strong><br />
      คำนี้มีเสียง Ä ที่ฟังออกด้านหน้า
    `,

    oe: `
      <strong>Hans:</strong><br />
      <strong>Ö</strong> เป็นเสียงที่ไม่มีตรง ๆ ในไทย<br />
      ให้ลองคิดว่าเสียงอยู่ด้านหน้า แต่ริมฝีปากกลม<br /><br />
      <strong>ตัวอย่าง:</strong><br />
      <strong>schön</strong><br />
      ใช้เสียงกลม แต่นุ่ม
    `,

    ue: `
      <strong>Hans:</strong><br />
      <strong>Ü</strong> คล้ายเสียง “อือ” แต่ปากต้องกลมมากขึ้น<br />
      และเสียงควรอยู่ด้านหน้า ไม่ใช่ลึกเกินไป<br /><br />
      <strong>ตัวอย่าง:</strong><br />
      <strong>für</strong>
    `,

    ss: `
      <strong>Hans:</strong><br />
      <strong>ß</strong> ไม่ได้เป็นเสียงใหม่มาก<br />
      โดยทั่วไปให้อ่านเหมือน <strong>ss</strong><br /><br />
      <strong>ตัวอย่าง:</strong><br />
      <strong>Straße</strong><br />
      คำนี้อ่านประมาณ “ชทราสเซอ”
    `,

    difference: `
      <strong>Hans:</strong><br />
      <strong>Ö</strong> กับ <strong>Ü</strong> ต่างกันที่ตำแหน่งเสียงและความตึงของปาก<br /><br />
      <strong>Ö</strong> = ฟังนุ่มกว่า เปิดกว่าเล็กน้อย<br />
      <strong>Ü</strong> = แคบกว่า ตึงกว่า และรู้สึกว่าปากกลมชัดกว่า<br /><br />
      ถ้าจำง่าย ๆ:<br />
      <strong>Ö</strong> = ผ่อนกว่า<br />
      <strong>Ü</strong> = ตึงกว่า
    `,

    practice: `
      <strong>Hans:</strong><br />
      วิธีฝึกที่ดีที่สุดตอนเริ่มต้นคือ:<br /><br />
      <strong>1.</strong> พูดช้า<br />
      <strong>2.</strong> แยกคำก่อน<br />
      <strong>3.</strong> พูดซ้ำ 3 รอบ<br />
      <strong>4.</strong> อย่าเน้นเร็ว ให้เน้นชัด<br /><br />
      <strong>ลำดับตัวอย่าง:</strong><br />
      Mädchen → schön → für → Straße
    `,

    pronunciation: `
      <strong>Hans:</strong><br />
      ถ้าคุณฝึกเสียง ให้คิดแบบนี้:<br /><br />
      <strong>Ä</strong> = แอ ชัด ๆ<br />
      <strong>Ö</strong> = เสียงหน้า + ปากกลม<br />
      <strong>Ü</strong> = เสียงหน้า + ปากกลมมากขึ้น<br />
      <strong>ß</strong> = ss
    `,

    fallback: `
      <strong>Hans:</strong><br />
      ตอนนี้ฉันช่วยคุณเรื่องเสียง <strong>Ä</strong>, <strong>Ö</strong>, <strong>Ü</strong>, <strong>ß</strong> และวิธีฝึกออกเสียงแบบง่าย ๆ
    `
  },

  quickLabels: {
    ae: "Ä?",
    oe: "Ö?",
    ue: "Ü?",
    ss: "ß?",
    practice: "How practise?",
    difference: "Ö vs Ü?"
  },

  intents: [
    { key: "ae", keywords: ["ä", "ae", "mädchen"] },
    { key: "oe", keywords: ["ö", "oe", "schön"] },
    { key: "ue", keywords: ["ü", "ue", "für"] },
    { key: "ss", keywords: ["ß", "ss", "straße"] },
    { key: "difference", keywords: ["difference", "ต่าง", "แตกต่าง", "ö ü", "ö vs ü"] },
    { key: "practice", keywords: ["practice", "ฝึก", "how practise", "ออกเสียงยังไง"] },
    { key: "pronunciation", keywords: ["pronunciation", "aussprache", "ออกเสียง", "sound"] }
  ]
};