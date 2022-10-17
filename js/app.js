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
    // console.log(categories)
    const categoriesSection = document.getElementById('categories-section');

    categories.forEach(category => {
        // console.log(category)
        const li = document.createElement('li');
        li.classList.add('mx-3', 'text-slate-500', 'font-medium',)
        li.innerHTML = `<button onclick="allNews('${category.category_id}')">${category.category_name}</button>`
        categoriesSection.appendChild(li)

    });
}
allNewsCategories()

const allNews = async (newsid) => {
    console.log(newsid);
    try {
        url = `https://openapi.programming-hero.com/api/news/category/${newsid}`
        res = await fetch(url);
        data = await res.json();
        displayAllNews(data.data);
    }
    catch (error) {
        console.log(error);
    }
}

const displayAllNews = (allNews) => {
    // console.log(allNews)
    const newsField = document.getElementById('news-field');
    newsField.innerHTML = ''
    allNews.forEach(news => {
        console.log(news)
        const div = document.createElement('div');
        div.innerHTML = `
        
        <div class="card lg:card-side bg-base-100 shadow-xl p-6">
                <figure><img class=" lg:h-[300px] lg:w-[300px]" src="${news.image_url}" alt="Album" /></figure>
                <div class="card-body">
                    <h2 class="card-title text-xl font-bold">${news.title}</h2>
                    <p class="text-lg text-gray-500"> ${news.details.substring(0, 250)}... </p>
                    <div class="card-actions justify-end">
                        <button class="btn btn-primary">Listen</button>
                    </div>
                    <div class="w-10 rounded-full">
                        <img src="" />
                    </div>

                </div>
            </div>
        `

        newsField.appendChild(div);
    })

}