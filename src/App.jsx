import data from "./data";
/* import { useState, useMemo, useDeferredValue } from "react"; */ // подключаем дополнительный хук
import { useState, useMemo, useTransition } from "react"; // подключаем дополнительный хук

import "./App.css";

function App() {
    const [text, setText] = useState(""); // состояние для текстового ввода
    const [posts, setPosts] = useState(data); // состояние для списка постов
    /* const defferedValue = useDeferredValue(text); */ // хук для отложенного значения (не используется в текущем коде)
    const [isPending, startTransition] = useTransition(); // хук для управления состоянием загрузки

    // useMemo используется для мемоизации списка фильтрованных постов, чтобы избежать повторных вычислений
    const filteredPosts = useMemo(() => {
        return posts.filter((item) => item.name.toLowerCase().includes(text));
    }, [text]); // пересчитывается только при изменении текста

    // onValueChange вызывается при изменении текста в поле ввода
    const onValueChange = (e) => {
        startTransition(() => {
            setText(e.target.value); // обновление текста происходит внутри transition
        });
    };

    return (
        <>
            <input value={text} type="text" onChange={onValueChange} />{" "}
            {/* Поле ввода текста */}
            <hr />
            <div>
                {isPending ? (
                    <h4>Loading...</h4> // отображаем индикатор загрузки, если состояние в ожидании
                ) : (
                    filteredPosts.map(
                        (
                            post // если фильтрация завершена, отображаем посты
                        ) => (
                            <div key={post._id}>
                                <h4>{post.name}</h4>
                            </div>
                        )
                    )
                )}
            </div>
        </>
    );
}

// 1. useDeferredValue — этот хук используется для отложенной обработки значения. Он не используется в данном коде, но мог бы быть полезен, если вам нужно отсрочить обработку изменений, которые не являются критичными для рендеринга, например, при вводе текста. Он позволяет избежать лишней перерисовки компонента в момент ввода.

// 2. useTransition — этот хук позволяет управлять состоянием "ожидания" в компоненте. Он используется здесь для того, чтобы обрабатывать тяжелые операции (например, фильтрацию массива) в фоновом режиме, не блокируя основной поток рендеринга. Когда вызывается startTransition(), React начинает выполнять обновление с более низким приоритетом, что помогает избежать блокировки UI и делает приложение более отзывчивым.

export default App;
