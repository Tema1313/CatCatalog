import type { Language } from "@/i18n";
import type { ICat, ICatBreedType, ICatLocationType, ICoatType, IColor } from "./model";

const catColorsRu: IColor[] = [
    { id: 1, name: "Черный", rgb: "rgb(0, 0, 0)", comment: "Сплошной черный окрас", date: "2025-04-07" },
    { id: 2, name: "Белый", rgb: "rgb(255, 255, 255)", comment: "Чисто белый окрас", date: "2025-04-07" },
    { id: 3, name: "Рыжий", rgb: "rgb(255, 140, 0)", comment: "Ярко-оранжевый, классический рыжий", date: "2025-04-07" },
    { id: 4, name: "Серый", rgb: "rgb(110, 123, 139)", comment: "Серо-голубой, часто называется голубым", date: "2025-04-07" },
    { id: 5, name: "Кремовый", rgb: "rgb(252, 230, 201)", comment: "Светло-кремовый, пастельный", date: "2025-04-07" },
    { id: 6, name: "Шоколадный", rgb: "rgb(75, 46, 30)", comment: "Темно-коричневый, цвет молочного шоколада", date: "2025-04-07" },
    { id: 7, name: "Лиловый", rgb: "rgb(181, 157, 187)", comment: "Светло-фиолетовый с серым оттенком", date: "2025-04-07" },
    { id: 8, name: "Циннамон", rgb: "rgb(160, 82, 45)", comment: "Красно-коричневый, цвет корицы", date: "2025-04-07" },
    { id: 9, name: "Фавн", rgb: "rgb(229, 170, 112)", comment: "Светло-олений, палевый", date: "2025-04-07" },
    { id: 10, name: "Черепаховый", rgb: "rgb(123, 63, 0)", comment: "Смесь черного и рыжего, базовый темный", date: "2025-04-07" },
    { id: 11, name: "Калико", rgb: "rgb(255, 255, 255)", comment: "Трехцветный: белый с рыжими и черными пятнами", date: "2025-04-07" },
    { id: 12, name: "Табби", rgb: "rgb(139, 125, 107)", comment: "Полосатый, теплый серо-коричневый", date: "2025-04-07" },
    { id: 13, name: "Биколор", rgb: "rgb(255, 255, 255)", comment: "Двухцветный: белый в сочетании с другим", date: "2025-04-07" },
    { id: 14, name: "Колор-поинт", rgb: "rgb(242, 232, 220)", comment: "Светлое тело с темными конечностями", date: "2025-04-07" },
    { id: 15, name: "Серебристый", rgb: "rgb(192, 192, 192)", comment: "Металлический серый", date: "2025-04-07" },
    { id: 16, name: "Золотистый", rgb: "rgb(218, 165, 32)", comment: "Теплый золотой", date: "2025-04-07" },
    { id: 17, name: "Голубой крем", rgb: "rgb(176, 168, 185)", comment: "Смесь голубого и кремового", date: "2025-04-07" },
    { id: 18, name: "Соболиный", rgb: "rgb(62, 39, 35)", comment: "Очень темный коричневый, почти черный", date: "2025-04-07" },
    { id: 19, name: "Дымчатый", rgb: "rgb(112, 128, 144)", comment: "Серо-синий, с эффектом дымки", date: "2025-04-07" },
    { id: 20, name: "Тигровый", rgb: "rgb(205, 133, 63)", comment: "Рыже-коричневый с полосами", date: "2025-04-07" }
];

const catColorsEn: IColor[] = [
    { id: 1, name: "Black", rgb: "rgb(0, 0, 0)", comment: "Solid black coat", date: "2025-04-07" },
    { id: 2, name: "White", rgb: "rgb(255, 255, 255)", comment: "Pure white coat", date: "2025-04-07" },
    { id: 3, name: "Ginger", rgb: "rgb(255, 140, 0)", comment: "Bright orange, classic ginger", date: "2025-04-07" },
    { id: 4, name: "Gray", rgb: "rgb(110, 123, 139)", comment: "Blue-gray, often referred to as blue", date: "2025-04-07" },
    { id: 5, name: "Cream", rgb: "rgb(252, 230, 201)", comment: "Light cream, pastel", date: "2025-04-07" },
    { id: 6, name: "Chocolate", rgb: "rgb(75, 46, 30)", comment: "Dark brown, milk chocolate color", date: "2025-04-07" },
    { id: 7, name: "Lilac", rgb: "rgb(181, 157, 187)", comment: "Light purple with a gray tint", date: "2025-04-07" },
    { id: 8, name: "Cinnamon", rgb: "rgb(160, 82, 45)", comment: "Reddish-brown, cinnamon color", date: "2025-04-07" },
    { id: 9, name: "Fawn", rgb: "rgb(229, 170, 112)", comment: "Light deer-colored, pale", date: "2025-04-07" },
    { id: 10, name: "Tortoiseshell", rgb: "rgb(123, 63, 0)", comment: "Mix of black and ginger, dark base", date: "2025-04-07" },
    { id: 11, name: "Calico", rgb: "rgb(255, 255, 255)", comment: "Tricolor: white with ginger and black patches", date: "2025-04-07" },
    { id: 12, name: "Tabby", rgb: "rgb(139, 125, 107)", comment: "Striped, warm gray-brown", date: "2025-04-07" },
    { id: 13, name: "Bicolor", rgb: "rgb(255, 255, 255)", comment: "Two-colored: white combined with another color", date: "2025-04-07" },
    { id: 14, name: "Colorpoint", rgb: "rgb(242, 232, 220)", comment: "Light body with dark extremities", date: "2025-04-07" },
    { id: 15, name: "Silver", rgb: "rgb(192, 192, 192)", comment: "Metallic gray", date: "2025-04-07" },
    { id: 16, name: "Golden", rgb: "rgb(218, 165, 32)", comment: "Warm gold", date: "2025-04-07" },
    { id: 17, name: "Blue cream", rgb: "rgb(176, 168, 185)", comment: "Mix of blue and cream", date: "2025-04-07" },
    { id: 18, name: "Sable", rgb: "rgb(62, 39, 35)", comment: "Very dark brown, almost black", date: "2025-04-07" },
    { id: 19, name: "Smoky", rgb: "rgb(112, 128, 144)", comment: "Blue-gray with a smoky effect", date: "2025-04-07" },
    { id: 20, name: "Tiger", rgb: "rgb(205, 133, 63)", comment: "Ginger-brown with stripes", date: "2025-04-07" }
];

const catColorsByLocale: Record<string, IColor[]> = {
    ru: catColorsRu,
    en: catColorsEn
};

const catCoatTypesRu: ICoatType[] = [
    { id: 1, name: "Длинношерстная", comment: "Длина шерсти более 5 см, густой подшерсток", date: "2025-04-07" },
    { id: 2, name: "Полудлинношерстная", comment: "Шерсть средней длины, часто с воротником и штанишками", date: "2025-04-07" },
    { id: 3, name: "Короткошерстная", comment: "Короткая, плотно прилегающая шерсть", date: "2025-04-07" },
    { id: 4, name: "Жесткошерстная", comment: "Проволочная, упругая шерсть, часто курчавая", date: "2025-04-07" },
    { id: 5, name: "Бесшерстная", comment: "Отсутствие шерсти или очень тонкий пух (сфинксы)", date: "2025-04-07" }
];

const catCoatTypesEn: ICoatType[] = [
    { id: 1, name: "Long-haired", comment: "Hair length over 5 cm, dense undercoat", date: "2025-04-07" },
    { id: 2, name: "Semi-long-haired", comment: "Medium-length coat, often with a ruff and breeches", date: "2025-04-07" },
    { id: 3, name: "Short-haired", comment: "Short, close-lying coat", date: "2025-04-07" },
    { id: 4, name: "Wire-haired", comment: "Wire-like, resilient coat, often curly", date: "2025-04-07" },
    { id: 5, name: "Hairless", comment: "No coat or very thin down (Sphynx cats)", date: "2025-04-07" }
];

const catCoatTypesByLocale: Record<Language, ICoatType[]> = {
    ru: catCoatTypesRu,
    en: catCoatTypesEn
};

const catBreedsRu: ICatBreedType[] = [
    { id: 1, name: "Британская короткошерстная", comment: "Плюшевая шерсть, спокойный и независимый характер" },
    { id: 2, name: "Шотландская вислоухая", comment: "Загнутые вперёд уши, дружелюбная и мягкая" },
    { id: 3, name: "Мейн-кун", comment: "Крупная порода, общительная, с кисточками на ушах" },
    { id: 4, name: "Персидская", comment: "Длинная шерсть, спокойный и ласковый нрав" },
    { id: 5, name: "Сиамская", comment: "Голубые глаза, окрас колор-поинт, разговорчивая" },
    { id: 6, name: "Канадский сфинкс", comment: "Бесшёрстная, тёплая на ощупь, очень привязчивая" },
    { id: 7, name: "Русская голубая", comment: "Серебристо-голубая шерсть, тихая и умная" },
    { id: 8, name: "Бенгальская", comment: "Леопардовый окрас, активная и игривая" },
    { id: 9, name: "Абиссинская", comment: "Тикированный окрас, энергичная и любопытная" },
    { id: 10, name: "Ориентальная", comment: "Утончённая, с большими ушами, очень общительная" },
    { id: 11, name: "Норвежская лесная", comment: "Густая водонепроницаемая шерсть, выносливая" },
    { id: 12, name: "Сибирская", comment: "Полудлинная шерсть, гипоаллергенная, преданная" },
    { id: 13, name: "Рэгдолл", comment: "Крупная, расслабленная, «тряпичная кукла» на руках" },
    { id: 14, name: "Бирманская", comment: "Белые «носочки», сапфировые глаза, нежная" },
    { id: 15, name: "Турецкая ангора", comment: "Элегантная, с пушистым хвостом, игривая" }
];

const catBreedsEn: ICatBreedType[] = [
    { id: 1, name: "British Shorthair", comment: "Plush coat, calm and independent temperament" },
    { id: 2, name: "Scottish Fold", comment: "Forward-folded ears, friendly and gentle" },
    { id: 3, name: "Maine Coon", comment: "Large breed, sociable, with ear tufts" },
    { id: 4, name: "Persian", comment: "Long coat, calm and affectionate nature" },
    { id: 5, name: "Siamese", comment: "Blue eyes, colorpoint coat, very talkative" },
    { id: 6, name: "Canadian Sphynx", comment: "Hairless, warm to the touch, very affectionate" },
    { id: 7, name: "Russian Blue", comment: "Silvery-blue coat, quiet and intelligent" },
    { id: 8, name: "Bengal", comment: "Leopard-like coat, active and playful" },
    { id: 9, name: "Abyssinian", comment: "Ticked coat, energetic and curious" },
    { id: 10, name: "Oriental", comment: "Slim, with large ears, very sociable" },
    { id: 11, name: "Norwegian Forest", comment: "Thick waterproof coat, hardy" },
    { id: 12, name: "Siberian", comment: "Semi-long coat, hypoallergenic, loyal" },
    { id: 13, name: "Ragdoll", comment: "Large, relaxed, goes limp like a rag doll when held" },
    { id: 14, name: "Birman", comment: "White gloves, sapphire eyes, gentle" },
    { id: 15, name: "Turkish Angora", comment: "Elegant, with a fluffy tail, playful" }
];

const catBreedsByLocale: Record<Language, ICatBreedType[]> = {
    ru: catBreedsRu,
    en: catBreedsEn
};

const catLocationTypeRu: ICatLocationType[] = [
    { id: 1, name: "Уличный" },
    { id: 2, name: "Домашний" }
];

const catLocationTypeEn: ICatLocationType[] = [
    { id: 1, name: "Stray" },
    { id: 2, name: "Domestic" }
];

const catLocationTypeByLocale: Record<Language, ICatLocationType[]> = {
    ru: catLocationTypeRu,
    en: catLocationTypeEn
};

const catsRu: ICat[] = [
    { id: 1, name: "Барсик", shortName: "Барс", coatTypeId: 3, owner: "Иван", mass: 4.2, date: "2025-01-15", colorId: 3, locationTypeId: 2, breedTypeId: 1, softness: "средняя", breadness: true, bigeyedness: 7, stars: 5, photos: ["https://ik.imagekit.io/tema13/Barsik/photo1.jpg", "https://ik.imagekit.io/tema13/Barsik/photo2.jpg", "https://ik.imagekit.io/tema13/Barsik/photo3.jpg"] },
    { id: 2, name: "Каспер", shortName: "Каспер", coatTypeId: 2, owner: "Артём", mass: 4.4, date: "2025-08-24", colorId: 19, locationTypeId: 2, breedTypeId: 7, softness: "мягкая булочка", breadness: true, bigeyedness: 9, stars: 5, photos: ["https://ik.imagekit.io/tema13/Kasper/photo1.jpg", "https://ik.imagekit.io/tema13/Kasper/photo2.jpg", "https://ik.imagekit.io/tema13/Kasper/photo3.jpg"] },
    { id: 3, name: "Рыжик", shortName: "Рыж", coatTypeId: 1, owner: "Олег", mass: 5.5, date: "2025-03-10", colorId: 3, locationTypeId: 1, breedTypeId: 3, softness: "очень мягкая", breadness: true, bigeyedness: 8, stars: 5, photos: ["https://ik.imagekit.io/tema13/Rijick/photo1.jpg", "https://ik.imagekit.io/tema13/Rijick/photo2.jpg"] },
    { id: 4, name: "Снежок", shortName: "Снеж", coatTypeId: 2, owner: "Мария", mass: 4.9, date: "2025-02-20", colorId: 2, locationTypeId: 1, breedTypeId: 4, softness: "мягкая", breadness: true, bigeyedness: 9, stars: 5, photos: ["https://ik.imagekit.io/tema13/Snejock/photo1.jpg", "https://ik.imagekit.io/tema13/Snejock/photo2.jpg", "https://ik.imagekit.io/tema13/Snejock/photo3.jpg"] },
    { id: 5, name: "неизвестно", shortName: "неизвестно", coatTypeId: 3, owner: "Артур", mass: 6.0, date: "2025-04-01", colorId: 1, locationTypeId: 2, breedTypeId: 7, softness: "средняя", breadness: true, bigeyedness: 10, stars: 5, photos: ["https://ik.imagekit.io/tema13/Kot/photo1.jpg", "https://ik.imagekit.io/tema13/Kot/photo2.jpg", "https://ik.imagekit.io/tema13/Kot/photo3.jpg", "https://ik.imagekit.io/tema13/Kot/photo4.jpg", "https://ik.imagekit.io/tema13/Kot/photo5.jpg"] },
    { id: 6, name: "Луна", shortName: "Луна", coatTypeId: 2, owner: "Елена", mass: 3.5, date: "2025-01-25", colorId: 1, locationTypeId: 2, breedTypeId: 7, softness: "мягкая", breadness: true, bigeyedness: 10, stars: 5, photos: ["https://ik.imagekit.io/tema13/Luna/photo1.jpeg", "https://ik.imagekit.io/tema13/Luna/photo2.jpg", "https://ik.imagekit.io/tema13/Luna/photo3.jpg"] },
    { id: 7, name: "Тиша", shortName: "Тиша", coatTypeId: 3, owner: "Дмитрий", mass: 3.1, date: "2025-03-05", colorId: 8, locationTypeId: 2, breedTypeId: 9, softness: "без шерсти", breadness: false, bigeyedness: 8, stars: 5, photos: ["https://ik.imagekit.io/tema13/Tisha/photo1.jpg", "https://ik.imagekit.io/tema13/Tisha/photo2.jpg", "https://ik.imagekit.io/tema13/Tisha/photo3.jpg"] },
    { id: 8, name: "Василиса", shortName: "Вася", coatTypeId: 1, owner: "Ольга", mass: 4.7, date: "2025-02-14", colorId: 17, locationTypeId: 1, breedTypeId: 10, softness: "очень мягкая", breadness: true, bigeyedness: 9, stars: 5, photos: ["https://ik.imagekit.io/tema13/Vasilisa/photo1.jpg", "https://ik.imagekit.io/tema13/Vasilisa/photo2.jpg", "https://ik.imagekit.io/tema13/Vasilisa/photo3.jpg"] },
    { id: 9, name: "Персик", shortName: "Перс", coatTypeId: 3, owner: "Сергей", mass: 5.2, date: "2025-04-02", colorId: 15, locationTypeId: 1, breedTypeId: 12, softness: "средняя", breadness: true, bigeyedness: 7, stars: 5, photos: ["https://ik.imagekit.io/tema13/Persik/photo1.jpg", "https://ik.imagekit.io/tema13/Persik/photo2.jpg"] },
    { id: 10, name: "Черныш", shortName: "Черн", coatTypeId: 4, owner: "Наталья", mass: 4.4, date: "2025-01-30", colorId: 1, locationTypeId: 2, breedTypeId: 11, softness: "жёсткая", breadness: false, bigeyedness: 6, stars: 5, photos: ["https://ik.imagekit.io/tema13/Chernish/photo1.jpg", "https://ik.imagekit.io/tema13/Chernish/photo2.jpg", "https://ik.imagekit.io/tema13/Chernish/photo3.jpg"] },
    { id: 11, name: "Маркиз", shortName: "Марк", coatTypeId: 2, owner: "Виктор", mass: 5.8, date: "2025-03-18", colorId: 20, locationTypeId: 1, breedTypeId: 13, softness: "мягкая", breadness: true, bigeyedness: 8, stars: 5, photos: ["https://ik.imagekit.io/tema13/Markis/photo1.jpg", "https://ik.imagekit.io/tema13/Markis/photo2.jpg", "https://ik.imagekit.io/tema13/Markis/photo3.jpg"] },
    { id: 12, name: "Ася", shortName: "Ася", coatTypeId: 5, owner: "Ирина", mass: 2.9, date: "2025-02-08", colorId: 14, locationTypeId: 1, breedTypeId: 14, softness: "без шерсти", breadness: false, bigeyedness: 10, stars: 5, photos: ["https://ik.imagekit.io/tema13/Asya/photo1.jpg", "https://ik.imagekit.io/tema13/Asya/photo2.jpg", "https://ik.imagekit.io/tema13/Asya/photo3.jpeg"] },
    { id: 13, name: "Леопольд", shortName: "Лео", coatTypeId: 1, owner: "Алексей", mass: 6.3, date: "2025-04-05", colorId: 18, locationTypeId: 2, breedTypeId: 15, softness: "очень мягкая", breadness: true, bigeyedness: 7, stars: 5, photos: ["https://ik.imagekit.io/tema13/Leopold/photo1.jpg", "https://ik.imagekit.io/tema13/Leopold/photo2.jpg"] },
    { id: 14, name: "Клео", shortName: "Клео", coatTypeId: 3, owner: "Татьяна", mass: 4.1, date: "2025-03-22", colorId: 6, locationTypeId: 1, breedTypeId: 2, softness: "средняя", breadness: false, bigeyedness: 6, stars: 5, photos: ["https://ik.imagekit.io/tema13/Kleo/photo1.jpg", "https://ik.imagekit.io/tema13/Kleo/photo2.jpg", "https://ik.imagekit.io/tema13/Kleo/photo3.jpg"] },
    { id: 15, name: "Пушок", shortName: "Пуш", coatTypeId: 2, owner: "Михаил", mass: 5.0, date: "2025-01-12", colorId: 7, locationTypeId: 1, breedTypeId: 5, softness: "мягкая", breadness: true, bigeyedness: 8, stars: 5, photos: ["https://ik.imagekit.io/tema13/Pushok/photo1.jpg", "https://ik.imagekit.io/tema13/Pushok/photo2.jpg", "https://ik.imagekit.io/tema13/Pushok/photo3.jpg"] },
    { id: 16, name: "Жорик", shortName: "Жора", coatTypeId: 4, owner: "Людмила", mass: 5.6, date: "2025-02-27", colorId: 12, locationTypeId: 2, breedTypeId: 1, softness: "жёсткая", breadness: false, bigeyedness: 5, stars: 5, photos: ["https://ik.imagekit.io/tema13/Jorik/photo1.jpg", "https://ik.imagekit.io/tema13/Jorik/photo2.jpg"] },
    { id: 17, name: "Ночка", shortName: "Ночь", coatTypeId: 1, owner: "Григорий", mass: 4.0, date: "2025-03-30", colorId: 16, locationTypeId: 2, breedTypeId: 6, softness: "очень мягкая", breadness: true, bigeyedness: 9, stars: 5, photos: ["https://ik.imagekit.io/tema13/Noch/photo1.jpg", "https://ik.imagekit.io/tema13/Noch/photo2.jpg"] },
    { id: 18, name: "Симба", shortName: "Сим", coatTypeId: 3, owner: "Ксения", mass: 5.3, date: "2025-04-07", colorId: 19, locationTypeId: 1, breedTypeId: 7, softness: "средняя", breadness: true, bigeyedness: 7, stars: 5, photos: ["https://ik.imagekit.io/tema13/Simba/photo1.jpg", "https://ik.imagekit.io/tema13/Simba/photo2.jpg", "https://ik.imagekit.io/tema13/Simba/photo3.jpg"] },
    { id: 19, name: "Дуся", shortName: "Дуся", coatTypeId: 2, owner: "Павел", mass: 3.7, date: "2025-01-19", colorId: 13, locationTypeId: 2, breedTypeId: 10, softness: "мягкая", breadness: false, bigeyedness: 8, stars: 5, photos: ["https://ik.imagekit.io/tema13/Dusia/photo1.jpg", "https://ik.imagekit.io/tema13/Dusia/photo2.jpg"] },
    { id: 20, name: "Том", shortName: "Том", coatTypeId: 5, owner: "Вера", mass: 3.3, date: "2025-02-11", colorId: 10, locationTypeId: 2, breedTypeId: 9, softness: "без шерсти", breadness: true, bigeyedness: 10, stars: 5, photos: ["https://ik.imagekit.io/tema13/Tom/photo1.jpg", "https://ik.imagekit.io/tema13/Tom/photo2.jpg"] }
];

const catsEn: ICat[] = [
    { id: 1, name: "Barsik", shortName: "Bars", coatTypeId: 3, owner: "Ivan", mass: 4.2, date: "2025-01-15", colorId: 3, locationTypeId: 2, breedTypeId: 1, softness: "medium", breadness: true, bigeyedness: 7, stars: 5, photos: ["https://ik.imagekit.io/tema13/Barsik/photo1.jpg", "https://ik.imagekit.io/tema13/Barsik/photo2.jpg", "https://ik.imagekit.io/tema13/Barsik/photo3.jpg"] },
    { id: 2, name: "Casper", shortName: "Casper", coatTypeId: 2, owner: "Artyom", mass: 4.4, date: "2025-08-24", colorId: 19, locationTypeId: 2, breedTypeId: 7, softness: "soft bun", breadness: true, bigeyedness: 9, stars: 5, photos: ["https://ik.imagekit.io/tema13/Kasper/photo1.jpg", "https://ik.imagekit.io/tema13/Kasper/photo2.jpg", "https://ik.imagekit.io/tema13/Kasper/photo3.jpg"] },
    { id: 3, name: "Ryzhik", shortName: "Ryzh", coatTypeId: 1, owner: "Oleg", mass: 5.5, date: "2025-03-10", colorId: 3, locationTypeId: 1, breedTypeId: 3, softness: "very soft", breadness: true, bigeyedness: 8, stars: 5, photos: ["https://ik.imagekit.io/tema13/Rijick/photo1.jpg", "https://ik.imagekit.io/tema13/Rijick/photo2.jpg"] },
    { id: 4, name: "Snezhok", shortName: "Snezh", coatTypeId: 2, owner: "Maria", mass: 4.9, date: "2025-02-20", colorId: 2, locationTypeId: 1, breedTypeId: 4, softness: "soft", breadness: true, bigeyedness: 9, stars: 5, photos: ["https://ik.imagekit.io/tema13/Snejock/photo1.jpg", "https://ik.imagekit.io/tema13/Snejock/photo2.jpg", "https://ik.imagekit.io/tema13/Snejock/photo3.jpg"] },
    { id: 5, name: "Unknown", shortName: "Unknown", coatTypeId: 3, owner: "Artur", mass: 6.0, date: "2025-04-01", colorId: 1, locationTypeId: 2, breedTypeId: 7, softness: "medium", breadness: true, bigeyedness: 10, stars: 5, photos: ["https://ik.imagekit.io/tema13/Kot/photo1.jpg", "https://ik.imagekit.io/tema13/Kot/photo2.jpg", "https://ik.imagekit.io/tema13/Kot/photo3.jpg", "https://ik.imagekit.io/tema13/Kot/photo4.jpg", "https://ik.imagekit.io/tema13/Kot/photo5.jpg"] },
    { id: 6, name: "Luna", shortName: "Luna", coatTypeId: 2, owner: "Elena", mass: 3.5, date: "2025-01-25", colorId: 1, locationTypeId: 2, breedTypeId: 7, softness: "soft", breadness: true, bigeyedness: 10, stars: 5, photos: ["https://ik.imagekit.io/tema13/Luna/photo1.jpeg", "https://ik.imagekit.io/tema13/Luna/photo2.jpg", "https://ik.imagekit.io/tema13/Luna/photo3.jpg"] },
    { id: 7, name: "Tisha", shortName: "Tisha", coatTypeId: 3, owner: "Dmitry", mass: 3.1, date: "2025-03-05", colorId: 8, locationTypeId: 2, breedTypeId: 9, softness: "hairless", breadness: false, bigeyedness: 8, stars: 5, photos: ["https://ik.imagekit.io/tema13/Tisha/photo1.jpg", "https://ik.imagekit.io/tema13/Tisha/photo2.jpg", "https://ik.imagekit.io/tema13/Tisha/photo3.jpg"] },
    { id: 8, name: "Vasilisa", shortName: "Vasya", coatTypeId: 1, owner: "Olga", mass: 4.7, date: "2025-02-14", colorId: 17, locationTypeId: 1, breedTypeId: 10, softness: "very soft", breadness: true, bigeyedness: 9, stars: 5, photos: ["https://ik.imagekit.io/tema13/Vasilisa/photo1.jpg", "https://ik.imagekit.io/tema13/Vasilisa/photo2.jpg", "https://ik.imagekit.io/tema13/Vasilisa/photo3.jpg"] },
    { id: 9, name: "Persik", shortName: "Pers", coatTypeId: 3, owner: "Sergey", mass: 5.2, date: "2025-04-02", colorId: 15, locationTypeId: 1, breedTypeId: 12, softness: "medium", breadness: true, bigeyedness: 7, stars: 5, photos: ["https://ik.imagekit.io/tema13/Persik/photo1.jpg", "https://ik.imagekit.io/tema13/Persik/photo2.jpg"] },
    { id: 10, name: "Chernysh", shortName: "Chern", coatTypeId: 4, owner: "Natalia", mass: 4.4, date: "2025-01-30", colorId: 1, locationTypeId: 2, breedTypeId: 11, softness: "coarse", breadness: false, bigeyedness: 6, stars: 5, photos: ["https://ik.imagekit.io/tema13/Chernish/photo1.jpg", "https://ik.imagekit.io/tema13/Chernish/photo2.jpg", "https://ik.imagekit.io/tema13/Chernish/photo3.jpg"] },
    { id: 11, name: "Markiz", shortName: "Mark", coatTypeId: 2, owner: "Viktor", mass: 5.8, date: "2025-03-18", colorId: 20, locationTypeId: 1, breedTypeId: 13, softness: "soft", breadness: true, bigeyedness: 8, stars: 5, photos: ["https://ik.imagekit.io/tema13/Markis/photo1.jpg", "https://ik.imagekit.io/tema13/Markis/photo2.jpg", "https://ik.imagekit.io/tema13/Markis/photo3.jpg"] },
    { id: 12, name: "Asya", shortName: "Asya", coatTypeId: 5, owner: "Irina", mass: 2.9, date: "2025-02-08", colorId: 14, locationTypeId: 1, breedTypeId: 14, softness: "hairless", breadness: false, bigeyedness: 10, stars: 5, photos: ["https://ik.imagekit.io/tema13/Asya/photo1.jpg", "https://ik.imagekit.io/tema13/Asya/photo2.jpg", "https://ik.imagekit.io/tema13/Asya/photo3.jpeg"] },
    { id: 13, name: "Leopold", shortName: "Leo", coatTypeId: 1, owner: "Alexey", mass: 6.3, date: "2025-04-05", colorId: 18, locationTypeId: 2, breedTypeId: 15, softness: "very soft", breadness: true, bigeyedness: 7, stars: 5, photos: ["https://ik.imagekit.io/tema13/Leopold/photo1.jpg", "https://ik.imagekit.io/tema13/Leopold/photo2.jpg"] },
    { id: 14, name: "Cleo", shortName: "Cleo", coatTypeId: 3, owner: "Tatiana", mass: 4.1, date: "2025-03-22", colorId: 6, locationTypeId: 1, breedTypeId: 2, softness: "medium", breadness: false, bigeyedness: 6, stars: 5, photos: ["https://ik.imagekit.io/tema13/Kleo/photo1.jpg", "https://ik.imagekit.io/tema13/Kleo/photo2.jpg", "https://ik.imagekit.io/tema13/Kleo/photo3.jpg"] },
    { id: 15, name: "Pushok", shortName: "Push", coatTypeId: 2, owner: "Mikhail", mass: 5.0, date: "2025-01-12", colorId: 7, locationTypeId: 1, breedTypeId: 5, softness: "soft", breadness: true, bigeyedness: 8, stars: 5, photos: ["https://ik.imagekit.io/tema13/Pushok/photo1.jpg", "https://ik.imagekit.io/tema13/Pushok/photo2.jpg", "https://ik.imagekit.io/tema13/Pushok/photo3.jpg"] },
    { id: 16, name: "Zhorik", shortName: "Zhora", coatTypeId: 4, owner: "Lyudmila", mass: 5.6, date: "2025-02-27", colorId: 12, locationTypeId: 2, breedTypeId: 1, softness: "coarse", breadness: false, bigeyedness: 5, stars: 5, photos: ["https://ik.imagekit.io/tema13/Jorik/photo1.jpg", "https://ik.imagekit.io/tema13/Jorik/photo2.jpg"] },
    { id: 17, name: "Nochka", shortName: "Noch", coatTypeId: 1, owner: "Grigory", mass: 4.0, date: "2025-03-30", colorId: 16, locationTypeId: 2, breedTypeId: 6, softness: "very soft", breadness: true, bigeyedness: 9, stars: 5, photos: ["https://ik.imagekit.io/tema13/Noch/photo1.jpg", "https://ik.imagekit.io/tema13/Noch/photo2.jpg"] },
    { id: 18, name: "Simba", shortName: "Sim", coatTypeId: 3, owner: "Ksenia", mass: 5.3, date: "2025-04-07", colorId: 19, locationTypeId: 1, breedTypeId: 7, softness: "medium", breadness: true, bigeyedness: 7, stars: 5, photos: ["https://ik.imagekit.io/tema13/Simba/photo1.jpg", "https://ik.imagekit.io/tema13/Simba/photo2.jpg", "https://ik.imagekit.io/tema13/Simba/photo3.jpg"] },
    { id: 19, name: "Dusya", shortName: "Dusya", coatTypeId: 2, owner: "Pavel", mass: 3.7, date: "2025-01-19", colorId: 13, locationTypeId: 2, breedTypeId: 10, softness: "soft", breadness: false, bigeyedness: 8, stars: 5, photos: ["https://ik.imagekit.io/tema13/Dusia/photo1.jpg", "https://ik.imagekit.io/tema13/Dusia/photo2.jpg"] },
    { id: 20, name: "Tom", shortName: "Tom", coatTypeId: 5, owner: "Vera", mass: 3.3, date: "2025-02-11", colorId: 10, locationTypeId: 2, breedTypeId: 9, softness: "hairless", breadness: true, bigeyedness: 10, stars: 5, photos: ["https://ik.imagekit.io/tema13/Tom/photo1.jpg", "https://ik.imagekit.io/tema13/Tom/photo2.jpg"] }
];

const catsByLocale: Record<Language, ICat[]> = {
    ru: catsRu,
    en: catsEn
};

export { catsByLocale, catLocationTypeByLocale, catBreedsByLocale, catCoatTypesByLocale, catColorsByLocale }