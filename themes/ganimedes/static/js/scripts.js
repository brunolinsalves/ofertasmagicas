function alterar_tema(event) {
    if (event.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        document.documentElement.setAttribute('data-bs-theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        document.documentElement.setAttribute('data-bs-theme', 'light');
    }    
}

function search_by_text(element) {
  texto = element.value
  page_element = document.querySelector(".page-link.active") 
  if (page_element != null) {
    actual_page = document.querySelector(".page-link.active").innerHTML
    mount_pagination(actual_page, 'all', texto)
  } else {
    numbered_pages = document.querySelector('#numbered_pages').innerHTML = "<li class='page-item'><a class='page-link  active' href='#products' onclick='mount_pagination(1,all, )'>1</a></li>"
  }
  
}

function do_filter_text(products, filter) {
  if (filter == undefined || filter == '') {
    return products
  }

  retorno = []
  for (var i = 0; i < products.length; i++) {
    if ( products[i].innerHTML.includes(filter) ) {
      retorno.push(products[i])
    }
  }

  return retorno
}

function mount_pagination(actual_page, categoria, text_filter) {


  category_button = document.querySelector(`#category_${categoria}`)
  set_button_active( category_button )
  
  if (categoria == 'all') {
    filtro_categoria = ''
  } else {
    filtro_categoria = '.' + categoria
  }

  filtered_products = produtos = document.querySelectorAll(`.filterDiv${filtro_categoria}`)
  filtered_products = do_filter_text(filtered_products, text_filter)

  items_per_page = document.querySelector('#items_per_page').value
  produtos = document.querySelectorAll(`.filterDiv`)
  qtd_paginas = Math.ceil(filtered_products.length / items_per_page)

  start_index = (actual_page - 1) * items_per_page
  end_index   = actual_page * items_per_page
  filter_products_from_pagination(produtos, categoria, text_filter, start_index, end_index)
  
  previous_page = document.querySelector('#previous_page')
  next_page     = document.querySelector('#next_page')
  
  if (qtd_paginas == 1) {
    w3AddClass(previous_page, 'disabled')
    w3AddClass(next_page, 'disabled')
  } else {
    if (actual_page == 1) {
      w3AddClass(previous_page, 'disabled')
    }
    if (actual_page == qtd_paginas) {
      w3AddClass(next_page, 'disabled')
    }
  }

  pages = document.querySelector('#numbered_pages')
  pages.innerHTML = ''
  for (let pagina = 1; pagina < qtd_paginas + 1; pagina++) {
    if (pagina == actual_page) {
      is_active = ' active'
    } else {
      is_active = ''
    }
    pagination_html = `<li class="page-item"><a class="page-link ${is_active}" href="#products" onclick="mount_pagination(${pagina},'${categoria}', '')">${pagina}</a></li>`
    pages.innerHTML += pagination_html
  }

}

function filter_products_from_pagination(produtos, categoria, text_filter, start, end) {

  for (let i = 0; i < produtos.length; i++) {
    w3RemoveClass(produtos[i], 'show')
  }

  if (categoria == 'all') {
    filtro_categoria = ''
  } else {
    filtro_categoria = '.' + categoria
  }

  filtered_products = produtos = document.querySelectorAll(`.filterDiv${filtro_categoria}`)
  filtered_products = do_filter_text(filtered_products, text_filter)

  for (let i = 0; i < filtered_products.length; i++) {
    if ( (i >= start) && (i < end) ) {
      w3AddClass(filtered_products[i], 'show')
    } else {
      w3RemoveClass(filtered_products[i], 'show')
    }
  }

  return false

}

function set_button_active(e) {
  buttons = document.querySelectorAll('.filter_button')
  
  for (let i = 0; i < buttons.length; i++) {
    if (Array.from(buttons[i].classList).includes('active')) {
      w3RemoveClass(buttons[i], 'active')
    }
  }
  w3AddClass(e, 'active')
}

function filterSelection(e, c) {
  set_button_active(e)
  var x, i;
  x = document.getElementsByClassName("filterDiv");
  if (c == "all") c = "";
  // Add the "show" class (display:block) to the filtered elements, and remove the "show" class from the elements that are not selected
  for (i = 0; i < x.length; i++) {
    w3RemoveClass(x[i], "show");
    
    if (x[i].className.indexOf(c) > -1) {
      w3AddClass(x[i], "show");
    }
  }
  
  return false
}
  
  // Show filtered elements
  function w3AddClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
      if (arr1.indexOf(arr2[i]) == -1) {
        element.className += " " + arr2[i];
      }
    }
  }
  
  // Hide elements that are not selected
  function w3RemoveClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
      while (arr1.indexOf(arr2[i]) > -1) {
        arr1.splice(arr1.indexOf(arr2[i]), 1);
      }
    }
    element.className = arr1.join(" ");
  }


  