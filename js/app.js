const allNewsCategories = async () => {
    try {
        const url = `https://openapi.programming-hero.com/api/news/categories`;
        const res = await fetch(url);
        const data = await res.json();

        displayCategories(data.data.news_category);
    }
    catch (error) {
        console.log(error);
    }
}

const displayCategories = categories => {
    console.log(categories)
    const categoriesSection = document.getElementById('categories-section');

    categories.forEach(category => {
        console.log(category)
        const li = document.createElement('li');
        li.classList.add('mx-3', 'text-slate-500', 'font-medium',)
        li.innerHTML = `<button onclick="allNews('${category.category_id}')">${category.category_name}</button>`
        categoriesSection.appendChild(li)

    });
}
allNewsCategories()

const allNews = async (newsid) => {
    console.log(newsid);
    url = `https://openapi.programming-hero.com/api/news/category/${newsid}`
    res = await fetch(url);
    data = await res.json();
    console.log(data)
}