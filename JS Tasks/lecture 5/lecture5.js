/* if (location.search) {
    // создаем объект для будущих параметров
    const params = {};
  
    // создаем массив строк-параметров ["phoneId=apple", "phoneId=xiaomi", "howShow=10"]
    const arrayStringParams = location.search.substring(1).split("&");
  
    // пробегаемся по массиву, созданному выше
    for (let stringParam of arrayStringParams) {
      let param = stringParam.split("="); // создаем массив значений параметра ["phoneId", "apple"]
      let nameParam = param[0]; // имя параметра
      let valueParam = param[1]; // значение параметра
      // проверка - если имя параметра уже существует в объекте параметров, тогда добавляй в массив значение параметра, иначе создай свойсво внутри объекта параметров, создай в нем массив и положи в него значение параметра {phoneId: Array(2), howShow: Array(1)}
      if (nameParam in params) {
        params[nameParam].push(valueParam);
      } else {
        params[nameParam] = [valueParam];
      }
    }
  
    // ищем форму фильтрации
    const filterForm = document.forms.filterForm;
  
    // создаем функцию, которая проходится по елементам формы и исходя из данных хранящихся в объекте с параметрами, делает или не делает их активными
    const updateInput = (gInputs, typeParam) => {
      for (let input of gInputs) {
        const param = params[typeParam];
        for (partParam of param) {
          if (partParam === input.value) {
            input.checked = true;
          }
        }
      }
    };
  
    updateInput(filterForm.modelPhone, "phoneId");
    updateInput(filterForm.howShow, "howShow");
  }
  
  // вешаем слушатель на форму, который будет обновлять значения параметров с location
  filterForm.addEventListener("submit", (e) => {
    e.preventDefault();
  
    let arrayCheckedInput = [];
  
    const addCheckedInput = (nameGroupInput, typeParam) => {
      for (checkbox of nameGroupInput) {
        if (checkbox.checked) {
          arrayCheckedInput.push(`${typeParam}=${checkbox.value}`);
        }
      }
    };
  
    addCheckedInput(e.target.modelPhone, "phoneId");
    addCheckedInput(e.target.howShow, "howShow");
  
    let stringCheckedInput = "";
  
    for ([index, activeInput] of arrayCheckedInput.entries()) {
      stringCheckedInput += activeInput;
      if (index != arrayCheckedInput.length - 1) {
        stringCheckedInput += "&";
      }
    }
  
    const baseUrl = `${location.origin}${location.pathname}`;
    const newUrl = baseUrl + `?${stringCheckedInput}`;
    location = newUrl;
  });  */

  if (location.search) {

    // создаем объект для будущих параметров
    let params = {};

    // создаем массив строк-параметров ["phoneId=apple", "phoneId=xiaomi", "howShow=10"];
    const arrayStringParams = location.search.substring(1).split('&');
    
     // пробегаемся по массиву, созданному выше
    for (let stringParam of arrayStringParams) {
      let param = stringParam.split('='); // создаем массив значений параметра ["phoneId", "apple"]
      let nameParam = param[0]; // имя параметра
      let valueParam = param[1];  //значение параметра

      // проверка - если имя параметра уже существует в объекте параметров, иначе создай свойсво внутри объекта параметров, создай в нем массив и положи в него значение параметра {phoneId: Array(2), howShow: Array(1)}
      
      if (nameParam in params) {
        //тогда добавляй в массив значение параметра;
        params[nameParam].push(valueParam);
      }  else {
        // иначе создай свойсво внутри объекта параметров, создай в нем массив и положи в него значение параметра {phoneId: Array(2), howShow: Array(1)};
        params[nameParam] = [valueParam];
      }
    }

    // ищем форму

    const filterForm = document.forms.filterForm;

    // создаем функцию, которая проходится по елементам формы и исходя из данных хранящихся в объекте с параметрами, делает или не делает их активными
    const updateInput = (gInputs, typeParam) => {
      for (let input of gInputs) {
        const param = params[typeParam];
        for (partParam of param) {
          if (partParam === input.value) {
            input.checked = true;
          }
        }
      }
    };
  
    updateInput(filterForm.modelPhone, "phoneId");
    updateInput(filterForm.limit, "limit");

  }
  // создаем объект url 

  const url = new URL(location.pathname, location.origin);


  filterForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // обрящаемся к searchParams и кладем значение
    url.searchParams.delete('limit');
    url.searchParams.delete('phoneId');

    const addCheckedInput = (nameGroupInput, typeParam) => {
      for (checkbox of nameGroupInput) {
        if (checkbox.checked) {
          url.searchParams.append(typeParam,checkbox.value);
        }
      }
    }
    addCheckedInput(e.target.modelPhone, "phoneId");
    addCheckedInput(e.target.limit, "limit");

    history.replaceState(null, '', url)
  });