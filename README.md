# Avenida Burguer — Site de pedidos via WhatsApp

Site estático (HTML + CSS + JavaScript puro, sem dependências, sem rastreadores).

## O que funciona de verdade
- Cardápio completo (5 categorias) transcrito do cardápio enviado, com preços em `js/menu-data.js`.
- Carrinho: adicionar, remover, alterar quantidade, total automático, persistência (só ids + quantidades no `localStorage`).
- Formulário de pedido (nome, entrega/retirada, endereço, pagamento, observações) com validação.
- Botão **Enviar pedido pelo WhatsApp**: abre `wa.me/5514997446463` com a mensagem pronta.
- Navegação por teclado, foco visível, diálogo acessível, `prefers-reduced-motion`.

## O que NÃO existe (e não finge existir)
- Não há backend, pagamento online, login, newsletter, avaliações ou slider. Avaliações de clientes e promoções ("Hot Deals") foram omitidas de propósito: não há depoimentos reais nem ofertas confirmadas.
- Por não haver backend, os preços são apenas **indicativos**; a hamburgueria confirma o valor final no WhatsApp (o cliente pode alterar valores no próprio navegador, então a confirmação humana é a validação oficial).

## Logo
A logo foi recortada da sua captura de tela e salva em **`assets/logo.png`** (512×512). Se tiver o arquivo original em alta qualidade, substitua este arquivo pelo mesmo nome. Como a logo e as fotos do cardápio são da própria hamburgueria, o proprietário deve confirmar que possui os direitos sobre elas.

## Pendências do proprietário
- Razão social, CNPJ, endereço, e-mail comercial.
- Horário de funcionamento de todos os dias (só o sábado 18:30–23:59 aparece no perfil).
- Área e taxa de entrega, prazo estimado, formas de pagamento aceitas.
- Prazo de retenção das conversas, se há entregadores terceiros, nome do encarregado de dados.
- Confirmar preços (o cardápio lista "Frango à passarinho 800g" duas vezes; foi incluído uma vez).
- Fotos reais de cada produto (hoje os cards usam ícones ilustrativos próprios).
- Domínio, para ajustar `robots.txt`/sitemap e `og:url`/`og:image`.
- Revisão por advogado da Política de Privacidade e dos Termos.

## Imagens e licenças
| Recurso | Origem | Licença |
|---|---|---|
| Ícones dos cards e favicon | Criados para este projeto (SVG inline) | Uso livre no projeto |
| `assets/logo.png` | Fornecido pelo proprietário | A confirmar pelo proprietário |
Nenhuma imagem de terceiros foi usada.

## Segurança (implementado)
- Todo conteúdo dinâmico é inserido com `textContent` (sem `innerHTML` com dados do usuário) → sem XSS.
- Entradas limpas e limitadas em tamanho; preços sempre lidos de `MENU`, nunca do `localStorage`.
- `noopener` ao abrir o WhatsApp; sem scripts, fontes ou CDNs externos.
- Ao publicar, ative HTTPS e envie cabeçalhos, por exemplo: `Content-Security-Policy: default-src 'self'; img-src 'self' data:; style-src 'self'; script-src 'self'; frame-ancestors 'none'`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`. (Netlify: arquivo `_headers`; Vercel: `vercel.json`.)

## Rodar e publicar
- Local: abra `index.html` ou rode `python3 -m http.server 8000` e acesse http://localhost:8000.
- Publicar: envie a pasta inteira para Netlify, Vercel, Cloudflare Pages ou GitHub Pages (todos têm HTTPS gratuito).

## Auditoria (status honesto)
| Categoria | Situação | Observação |
|---|---|---|
| Acessibilidade | Implementado, **não testado** com axe/WAVE/leitor de tela | Rodar Lighthouse + axe após publicar. Contrastes usam laranja escuro (#c24d08) com texto branco. |
| Segurança | Boas práticas aplicadas; sem backend | Validar cabeçalhos no host. Risco médio: preços manipuláveis no cliente (mitigado pela confirmação no WhatsApp). |
| LGPD | Política e fluxo mínimo de dados implementados | Depende de preencher controlador/contato e revisão jurídica. Sem cookies não essenciais → sem banner. |
| Copyright | Sem imagens de terceiros | Confirmar direitos da logo/fotos do cardápio. |
| SEO | Title, description, Open Graph, favicon, robots | Falta sitemap (precisa do domínio) e imagem OG. |
| Desempenho | Página leve, sem libs | Não medido com Lighthouse. |
| Riscos jurídicos | Preços/horários/entrega marcados como pendentes | Alto se publicar sem preencher os campos [PENDENTE]. |

Nenhuma conformidade legal é declarada: depende de validação profissional.
