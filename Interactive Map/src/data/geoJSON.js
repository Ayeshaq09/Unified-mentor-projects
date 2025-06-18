const locationList = [
  {
    type: "Feature",
    properties: {
      name: "Taj Mahal",
      address: "Man Singh Road Area, New Delhi, New Delhi, Delhi, India",
      description: "The Taj Mahal is an ivory-white marble mausoleum on the right bank of the river Yamuna in Agra, Uttar Pradesh, India. It was commissioned in 1631 by the fifth Mughal emperor, Shah Jahan to house the tomb of his beloved wife, Mumtaz Mahal; it also houses the tomb of Shah Jahan himself.",
      image: "taj-mahal.jpg"
    },
    geometry: {
      coordinates: [27.1751, 78.0421],
      type: "Point",
    },
  },
  {
    type: "Feature",
    properties: {
      name: "Adiyogi Shiva Statue",
      address: "Velliangiri Foothills, Mahashivaratri Grounds, Ishana Vihar, Coimbatore, Tamil Nadu",
      description: "The Adiyogi Shiva bust is a 34-metre tall, 45-metre long and 25-metre wide steel bust of Shiva with Thirunamam at Coimbatore, Tamil Nadu. It is recognized by the Guinness World Records as the ”Largest Bust Sculpture” in the world.",
      image: "adiyogi.jpeg"
    },
    geometry: {
      coordinates: [10.9725, 76.7404],
      type: "Point",
    },
  },
  {
    type: "Feature",
    properties: {
      name: "Shree Somnath Temple",
      address: "Somnath Mandir Rd, Somnath, Prabhas Patan, Gujarat",
      description: "Somnath Temple is a Hindu temple, located in Prabhas Patan, Veraval in Gujarat, India. It is one of the most sacred pilgrimage sites the Tirtha Kshetra for Hindus and is the first among the twelve jyotirlinga shrines of Shiva.",
      image: "shree-somnath-temple.jpg"
    },
    geometry: {
      type: "Point",
      coordinates: [20.8880, 70.4013],
    },
  },
  {
    type: "Feature",
    properties: {
      name: "Lotus Temple",
      address:
        "Shambhu Dayal Bagh, 110019, Kalkaji, New Delhi, South East Delhi, Delhi, India",
        description: "The Lotus Temple is a Baháʼí House of Worship in Kalkaji, New Delhi, Delhi, India. It was completed in December 1986. Notable for its lotus-like shape, it has become a prominent attraction in the city.",
        image: "lotus-temple.jpg"
    },
    geometry: {
      coordinates: [28.5535, 77.2588],
      type: "Point",
    },
  },
  {
    type: "Feature",
    properties: {
      name: "Hawa Mahal",
      address: "Hawa Mahal Rd, Badi Choupad, J.D.A. Market, Pink City, Jaipur, Rajasthan",
      description: "The Hawa Mahal is a palace in the city of Jaipur, Rajasthan, India. Built from red and pink sandstone, it is on the edge of the City Palace, Jaipur, and extends to the Zenana, or women's chambers. Hawa Mahal is known as the “palace of winds“.",
      image: "hawa-mahal.jpg"
    },
    geometry: {
      coordinates: [26.9240, 75.8267],
      type: "Point",
    },
  },
  {
    type: "Feature",
    properties: {
      name: "Golden Temple",
      address: "Golden Temple Rd, Atta Mandi, Katra Ahluwalia, Amritsar, Punjab",
      description: "The Golden Temple, also known as Sri Harmandir Sahib, is a prominent Sikh religious shrine located in Amritsar, Punjab, India. It's a globally recognized symbol of Sikhism, known for its beautiful architecture, particularly its gold-plated dome, and its welcoming atmosphere, offering free meals (langar) to all visitors regardless of their background.",
      image: "golden-temple.jpg"
    },
    geometry: {
      coordinates: [31.6200, 74.8765],
      type: "Point",
    },
  },
];

module.exports = locationList;
