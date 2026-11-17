/* Cardápio da Avenida Burguer — transcrito do cardápio oficial enviado pelo proprietário.
   Preços em centavos para evitar erros de ponto flutuante. Revise antes de publicar. */
window.MENU = {
  whatsapp: "5514997446463",
  categories: [
    { id: "artesanal", name: "Hambúrguer Artesanal", icon: "burger", items: [
      { id: "pop", name: "Pop", price: 2090, desc: "Pão de hambúrguer, maionese, hambúrguer artesanal 150g e mussarela", tag: "" },
      { id: "salad", name: "Salad", price: 2390, desc: "Pão de hambúrguer, maionese, hambúrguer artesanal 150g, mussarela, tomate, cebola roxa e alface ou rúcula", tag: "" },
      { id: "salad-bacon", name: "Salad Bacon", price: 2890, desc: "Pão de hambúrguer, maionese, hambúrguer artesanal 150g, mussarela, bacon, tomate, cebola roxa e alface ou rúcula", tag: "" },
      { id: "rodeio", name: "Rodeio", price: 2990, desc: "Pão de hambúrguer, maionese, hambúrguer artesanal 150g, mussarela, ovo, onion rings, cream cheese, tomate, cebola roxa e alface ou rúcula", tag: "" },
      { id: "egg-salad", name: "Egg Salad", price: 2690, desc: "Pão de hambúrguer, maionese, hambúrguer artesanal 150g, ovo, mussarela, tomate, cebola roxa e alface ou rúcula", tag: "" },
      { id: "crispy-king", name: "Crispy King", price: 3390, desc: "Pão de hambúrguer, maionese, hambúrguer artesanal 150g, mussarela, cheddar, bacon, cebola crispy, barbecue, tomate, cebola roxa e alface ou rúcula", tag: "" },
      { id: "avenida", name: "Avenida", price: 3890, desc: "Pão de hambúrguer, maionese, 2 hambúrgueres artesanais 150g, mussarela, bacon, cheddar, tomate, cebola roxa e alface ou rúcula", tag: "Da casa" },
      { id: "fabuloso", name: "Fabuloso", price: 3390, desc: "Pão de brioche, hambúrguer artesanal 150g, queijo cheddar, bacon e cebola caramelizada", tag: "" },
      { id: "texas", name: "Texas", price: 4090, desc: "Pão de hambúrguer, maionese, 2 hambúrgueres artesanais 150g, mussarela, bacon, ovo, onion rings, cream cheese, tomate, cebola roxa e alface ou rúcula", tag: "" },
      { id: "doritos-supreme", name: "Doritos Supreme", price: 3590, desc: "Pão de brioche, hambúrguer artesanal 150g, queijo cheddar, bacon, doritos e maionese de bacon", tag: "" }
    ]},
    { id: "frango", name: "Frango", icon: "burger", items: [
      { id: "chicken-salad", name: "Chicken Salad", price: 2590, desc: "Pão de hambúrguer, maionese, filé de frango picado, mussarela, tomate, cebola roxa e alface ou rúcula", tag: "" },
      { id: "chicken-chefe", name: "Chicken da Chefe", price: 2980, desc: "Pão de hambúrguer, maionese, filé de frango picado, cream cheese, mussarela, tomate, cebola roxa e alface ou rúcula", tag: "" },
      { id: "chicken-bacon", name: "Chicken Bacon", price: 3090, desc: "Pão de hambúrguer, maionese, filé de frango picado, bacon, mussarela, tomate, cebola roxa e alface ou rúcula", tag: "" }
    ]},
    { id: "hotdog", name: "Hot Dog", icon: "hotdog", items: [
      { id: "hd-simples", name: "Hot Dog Simples", price: 1690, desc: "Pão de hot dog, maionese, ketchup, mostarda, 1 salsicha, mussarela e batata palha", tag: "" },
      { id: "hd-especial", name: "Hot Dog Especial", price: 2090, desc: "Pão de hot dog, maionese, ketchup, mostarda, 2 salsichas, tomate picado, mussarela, milho, batata palha e alface", tag: "" },
      { id: "hd-avenida", name: "Hot Dog Avenida", price: 2590, desc: "Pão de hot dog, maionese, ketchup, mostarda, 2 salsichas, bacon, catupiry, tomate picado, milho, mussarela, batata palha e alface", tag: "Da casa" },
      { id: "hd-frango", name: "Hot Dog Frango", price: 2390, desc: "Pão de hot dog, maionese, ketchup, mostarda, 2 salsichas, filé de frango picado, tomate picado, milho, mussarela, batata palha e alface", tag: "" },
      { id: "combinho-livia", name: "Combinho Lívia", price: 2190, desc: "Mini pão de brioche, hambúrguer smash e mussarela + 180g de batata frita + Danoninho ou Pitchulinha", tag: "Kids" }
    ]},
    { id: "porcoes", name: "Porções", icon: "fries", items: [
      { id: "batata-ind", name: "Batata frita — individual (180g)", price: 990, desc: "Porção de batata frita individual douradinha e crocante", tag: "" },
      { id: "batata-meia", name: "Batata frita — meia (500g)", price: 2690, desc: "Porção de batata frita douradinha e crocante", tag: "" },
      { id: "batata-inteira", name: "Batata frita — inteira (1kg)", price: 4490, desc: "Porção de batata frita douradinha e crocante", tag: "" },
      { id: "batata-avenida", name: "Batata Avenida — inteira (1kg)", price: 7190, desc: "Porção de batata frita com calabresa, bacon, catupiry, cheddar e mussarela", tag: "Da casa" },
      { id: "batata-cheddar-bacon", name: "Batata, cheddar e bacon — inteira (700g)", price: 5690, desc: "Porção de batata frita coberta com cheddar e bacon", tag: "" },
      { id: "aneis-meia", name: "Anéis de cebola — meia (10un)", price: 1890, desc: "Porção de anéis de cebola douradinhos e crocantes", tag: "" },
      { id: "aneis-inteira", name: "Anéis de cebola — inteira (20un)", price: 2890, desc: "Porção de anéis de cebola douradinhos e crocantes", tag: "" },
      { id: "frango-passarinho", name: "Frango à passarinho — inteira (800g)", price: 4190, desc: "Porção de frango à passarinho saboroso e crocante + batata frita como acompanhamento", tag: "" },
      { id: "calabresa", name: "Calabresa acebolada — inteira (400g)", price: 2490, desc: "Porção de calabresa e cebola. Acompanha pão, salada e molho de pimenta da chefe", tag: "" }
    ]},
    { id: "bebidas", name: "Bebidas", icon: "drink", items: [
      { id: "agua", name: "Água sem gás 500ml", price: 300, desc: "Embalagem de 500ml", tag: "" },
      { id: "refri-lata", name: "Refrigerante lata", price: 500, desc: "Consultar sabores no WhatsApp", tag: "" },
      { id: "coca-1l", name: "Coca-Cola 1 litro", price: 900, desc: "Embalagem de 1 litro", tag: "" },
      { id: "coca-2l", name: "Coca-Cola 2 litros", price: 1500, desc: "Embalagem de 2 litros", tag: "" },
      { id: "guarana-2l", name: "Guaraná 2 litros", price: 700, desc: "Embalagem de 2 litros", tag: "" },
      { id: "suco-poupa", name: "Suco Poupa — jarra 500ml", price: 1200, desc: "Jarra de 500ml", tag: "" },
      { id: "cerveja-lata", name: "Cerveja lata", price: 600, desc: "Consultar sabores no WhatsApp. Venda proibida para menores de 18 anos.", tag: "+18" },
      { id: "cerveja-600", name: "Cerveja Original 600ml", price: 1200, desc: "Embalagem de 600ml. Venda proibida para menores de 18 anos.", tag: "+18" }
    ]}
  ]
};
