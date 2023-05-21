import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
// import "../assets/fonts/jspdfFonts/IRANSansWeb(FaNum)_Bold-normal.js";
// import logo from "../assets/img/logo/netposLogo.png";
// import "../config/storeConfig/storeInfo.json";

export default function invoicePrint(invoiceItems) {
  const totalQuantity = 0;
  const totalDiscount = 0;
  const totalPrice = 0;
  const price = 0;
  const body = [];

  const defaultStyle = {
    halign: "center",
    font: "IRANSansWeb(FaNum)_Bold",
    fontSize: "10",
  };
  const OrderCode = {
    content: "123564",
    colSpan: 6,
    styles: defaultStyle,
  };

  body.push([OrderCode]);

  const storeName = [
    {
      content: "یاران دریان",
      colSpan: 4,
      styles: defaultStyle,
    },
    {
      content: "نام فروشگاه",
      colSpan: 2,
      styles: defaultStyle,
    },
  ];
  body.push(storeName);
  const customerName = [
    {
      content: "والا" + " " + "خسروی",
      colSpan: 4,
      styles: defaultStyle,
    },
    {
      content: " مشتری",
      colSpan: 2,
      styles: defaultStyle,
    },
  ];

  body.push(customerName);

  const customerAddress = {
    content: "آدرس :" + "تهران",
    colSpan: 6,
    styles: { ...defaultStyle },
  };
  body.push([customerAddress]);

  const header = [
    [
      {
        content: "نــــــام کــــــالا",
        colSpan: "5",
        styles: {
          ...defaultStyle,
          halign: "center",
          fillColor: [0, 0, 0],
          textColor: [255, 255, 255],
        },
      },
      {
        content: "",
        rowSpan: "3",
        styles: {
          ...defaultStyle,
          valign: "middle",
          fontSize: "7",
          fillColor: [0, 0, 0],
          textColor: [255, 255, 255],
        },
      },
    ],
    [
      {
        content: "بــــــارکـــد",
        colSpan: "5",
        styles: {
          ...defaultStyle,
          halign: "center",
          fontSize: "7",
          fillColor: [0, 0, 0],
          textColor: [255, 255, 255],
        },
      },
    ],
    [
      {
        content: "قیمت کل",
        styles: {
          ...defaultStyle,
          fontSize: "7",
          fillColor: [0, 0, 0],
          textColor: [255, 255, 255],
        },
      },
      {
        content: "تعداد",
        styles: {
          ...defaultStyle,
          fontSize: "7",
          fillColor: [0, 0, 0],
          textColor: [255, 255, 255],
        },
      },
      {
        content: "با تخفیف",
        styles: {
          ...defaultStyle,
          fontSize: "7",
          fillColor: [0, 0, 0],
          textColor: [255, 255, 255],
        },
      },
      {
        content: "تخفیف%",
        styles: {
          ...defaultStyle,
          fontSize: "7",
          fillColor: [0, 0, 0],
          textColor: [255, 255, 255],
        },
      },
      {
        content: "قیمت کالا",
        styles: {
          ...defaultStyle,
          fontSize: "7",
          fillColor: [0, 0, 0],
          textColor: [255, 255, 255],
        },
      },
    ],
  ];

  body.push(...header);
  invoiceItems?.forEach((item, index) => {
    const rowIndex = {
      content: index + 1 + "",
      rowSpan: 3,
      styles: { ...defaultStyle, valign: "middle", cellWidth: 6 },
    };
    const title = {
      content: item.productName,
      colSpan: 5,
      styles: defaultStyle,
    };

    const quantity = {
      content: item.quantity.toLocaleString(),
      styles: { ...defaultStyle },
    };
    const price = {
      content: item.price.toLocaleString(),
      styles: { ...defaultStyle },
    };
    const discountedPrice = {
      content: item.discountedPrice.toLocaleString(),
      styles: { ...defaultStyle },
    };
    const discountPercentage = {
      content: item.discount.toFixed(2) * 100 + "",
      styles: { ...defaultStyle },
    };
    const total = {
      content: (item.quantity * item.discountedPrice).toLocaleString(),
      styles: { ...defaultStyle },
    };
    const barcode = {
      content: item.barcode,
      colSpan: 5,
      styles: { ...defaultStyle, fontSize: "10" },
    };

    const section = [
      [title, rowIndex],
      [barcode],
      [total, quantity, discountedPrice, discountPercentage, price],
    ];

    body.push(...section);
  });

  const doc = new jsPDF("p", "mm", [
    80,
    body.length * 13 + 150 > 300 ? 300 : body.length * 13 + 150,
  ]);

  doc.addFont("IRANSansWeb(FaNum)_Bold", "normal");
  doc.setFont("IRANSansWeb(FaNum)_Bold");

  // doc.addImage(logo, "png", 22, 5, 45, 9);

  autoTable(doc, {
    startY: 19,
    showHead: "firstPage",
    margin: {
      right: 0,
      left: 0,
      top: 0,
      button: 0,
    },
    headStyles: {
      fontSize: 12,
      font: "IRANSansWeb(FaNum)_Bold",
      halign: "center",
      lineWidth: 0.5,
      lineColor: [0, 0, 0],
    },
    bodyStyles: {
      lineWidth: 0.5,
      lineColor: [0, 0, 0],
    },

    body: body,
    theme: "plain",
  });

  autoTable(doc, {
    margin: {
      right: 0,
      left: 0,
      top: 0,
      button: 0,
    },
    bodyStyles: {
      fontSize: 12,
      font: "IRANSansWeb(FaNum)_Bold",
      halign: "center",
      lineWidth: 0.5,
      lineColor: [0, 0, 0],
    },

    body: [
      [
        {
          content: totalQuantity,
        },
        { content: "تعداد کالا", styles: { fontSize: 10, halign: "right" } },
      ],
      [
        { content: price },
        { content: "مجموع کل", styles: { fontSize: 10, halign: "right" } },
      ],

      [
        { content: totalDiscount },
        { content: "مجموع تخفیف", styles: { fontSize: 10, halign: "right" } },
      ],
      [
        {
          content: totalPrice.toLocaleString(),
          styles: {
            halign: "center",
            fillColor: [0, 0, 0],
            textColor: [255, 255, 255],
          },
        },
        {
          content: "مبلغ قابل پرداخت",
          styles: {
            halign: "right",
            fillColor: [0, 0, 0],
            textColor: [255, 255, 255],
          },
        },
      ],
      [
        {
          content: "پشتیبانی نرم افزار" + "  " + "57785778-021",
          colSpan: "2",
          styles: { fontSize: 10, halign: "center", cellPadding: 2 },
        },
      ],
    ],
    theme: "plain",
  });

  doc.save("25");
}