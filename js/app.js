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
// spinner  function
const toggleSpinner = isLoading => {
    const spinningSection = document.getElementById('spinner');
    if (isLoading) {
        spinningSection.classList.remove('hidden');
    }
    else {
        spinningSection.classList.add('hidden');
    }
}


allNewsCategories()
//display all categories
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


const allNews = async (catagoryId) => {
    // spinner start 
    toggleSpinner(true)
    // console.log(catagoryId);
    try {
        url = `https://openapi.programming-hero.com/api/news/category/${catagoryId}`
        res = await fetch(url);
        data = await res.json();
        displayAllNews(data.data);

    }
    catch (error) {
        console.log(error);
    }

}

// display all news in card
const displayAllNews = (allNews) => {
    // console.log(allNews)
    const newsCountSection = document.getElementById('main-part');
    if (allNews.length !== 0) {
        newsCountSection.innerText = `${allNews.length} items found in this category `

    }
    else {
        newsCountSection.innerText = 'No data found in this category '
    }
    const newsField = document.getElementById('news-field');
    newsField.innerHTML = ''
    allNews.forEach(news => {
        // console.log(news)
        const div = document.createElement('div');
        div.innerHTML = `
        
        <div class="card lg:card-side bg-base-100 shadow-xl p-6">
                <figure><img class=" lg:h-[300px] lg:w-[300px]" src="${news?.image_url}" alt="Album" /></figure>
            <div class="card-body pb-0 pt-2">
                    <h2 class="card-title text-xl font-bold mb-7">${news?.title}</h2>
                    <p class="text-lg text-gray-500"> ${news?.details.substring(0, 250)}... </p>
                <div class="flex justify-between">
                    <div class="flex items-center">
                         <img class="w-14 rounded-full mr-3" src="${news?.author.img}" />
                        <div> 
                            <p class="font-medium text-gray-500"> ${news?.author?.name ? news.author?.name : 'NO DATA'}</p>
                            <p class="font-medium text-gray-500"> ${news?.author?.published_date ? news.author?.published_date : 'NO date'}</p>

                        </div>
                    </div>
                    <div class="flex items-center font-medium text-gray-500"> 
                        <p><i class="fa-solid fa-eye"></i> ${news?.total_view ? news.total_view : 'NO VIEWS'} </p>
                    </div>
                    <div class=" justify-end">
                        
                        <label onclick="individualNews('${news?._id}')" for="my-modal-3" class="btn btn btn-active"><i class="fa-solid fa-arrow-right"></i></label>
                    </div>
                    
                </div>

            </div>
        </div>
        `

        newsField.appendChild(div);

    })
    // spinner stop 

    toggleSpinner(false)

}
//view all data in a modal
const individualNews = async (newsId) => {
    try {
        const url = `https://openapi.programming-hero.com/api/news/${newsId}`
        const res = await fetch(url);
        const data = await res.json();
        viewFullNews(data.data[0])
    }
    catch (error) {
        console.log(error);

    }

}

const modalDiv = document.createElement('div');
const viewFullNews = (singleData) => {
    console.log(singleData)
    const modalSection = document.getElementById('modal-section')
    modalDiv.classList.add('modal')
    modalDiv.innerHTML = `
                <div class="modal-box w-full relative">
                <label for="my-modal-3" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                <div class="card  'w-3/4'mg  alt="Shoes>
                    <figure><img  src="${singleData.image_url}" alt="Album" /></figure>
                    <div class="card-body">
                            <h2 class="card-title text-xl font-bold mb-7">${singleData.title}</h2>
                            <p class="text-lg text-gray-500"> ${singleData?.details}</p>
                        <div class="flex justify-between">
                            <div class="flex items-center">
                                <img class="w-14 rounded-full mr-3" src="${singleData.author.img}" />
                                <div> 
                                    <p class="font-medium text-gray-500"> ${singleData.author?.name ? singleData.author?.name : 'NO DATA'}</p>
                                    <p class="font-medium text-gray-500"> ${singleData.author?.published_date ? singleData.author?.published_date : 'NO date'}</p>

                                </div>
                            </div>
                            <div class="flex items-center font-medium text-gray-500"> 
                                <p><i class="fa-solid fa-eye"></i> ${singleData?.total_view ? singleData.total_view : 'NO VIEWS'} </p>
                            </div>       
                        </div>
                    </div>
                </div>
            </div>

    `
    modalSection.appendChild(modalDiv)
}

