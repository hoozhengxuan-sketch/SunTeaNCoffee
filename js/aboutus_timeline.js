const historyData = [
{
    image: "../img/KL_Store.jpeg",
    title: "Kuala Lumpur",
    text: "In 2023,Sun Tea & Coffee opened its first store in Kuala Lumpur, with the combination of high-quality tea leaves, fresh fruits and good coffee, creating handcrafted drinks. This was the start to us of providing warmth, freshness and happiness in every cup."
},
{
    image: "../img/Klang_Store.jpeg",
    title: "Klang",
    text: "In 2024, Sun Tea & Coffee expanded to Klang, allowing more customers to enjoy our handcrafted drinks. The outlet was soon a popular family, student, and coffee-lover's destination."
},
{
    image: "../img/Johor_Store.jpeg",
    title: "Johor Bahru",
    text: "In 2025, we launched our Johor Bahru store and had some fun and new seasonal drinks. This growth further reinforced our commitment to providing quality beverages and cozy service in more communities."
},
{
    image: "../img/Penang_Store.jpeg",
    title: "Penang",
    text: "In 2026, Sun Tea & Coffee arrived in Penang, continuing our mission of sharing fresh tea, premium coffee, and unforgettable moments with customers across Malaysia."
}
];

const timelineItems = document.querySelectorAll(".timeline-item");
const historyImage = document.getElementById("historyImage");
const historyTitle = document.getElementById("historyTitle");
const historyDescription = document.getElementById("historyDescription");

timelineItems.forEach(function(item){
    item.addEventListener("click",function(){
        timelineItems.forEach(function(i){
            i.classList.remove("active");
        });
        item.classList.add("active");
        const index = item.dataset.index;
        historyImage.src = historyData[index].image;
        historyTitle.textContent = historyData[index].title;
        historyDescription.textContent = historyData[index].text;
    });
});