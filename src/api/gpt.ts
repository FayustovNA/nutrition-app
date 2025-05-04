// import { OpenAI } from 'openai';

// const openai = new OpenAI({
//     apiKey: import.meta.env.VITE_OPENAI_API_KEY, // Используйте переменную с префиксом NEXT_PUBLIC_
//     dangerouslyAllowBrowser: true // Разрешите использование API в браузере
// });

// export const getFoodRecommendations = async (deficit: Record<string, number>) => {
//     const prompt = `
//     У меня нехватка следующих нутриентов:
//     ${Object.entries(deficit).map(([nutrient, amount]) => `${nutrient}: ${amount} г`).join(", ")}.
    
//     Подскажи продукты, которые помогут восполнить эти нутриенты. Укажи 3-5 примеров для каждого.
//     `;

//     try {
//         const response = await openai.chat.completions.create({
//             model: "gpt-4o",
//             messages: [
//                 { "role": "user", "content": prompt }
//             ]
//         });

//         return response.choices[0]?.message?.content || "Нет данных";
//     } catch (error) {
//         console.error("Ошибка при получении рекомендаций:", error);
//         return "Ошибка загрузки";
//     }
// };