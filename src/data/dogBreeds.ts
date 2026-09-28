export const POPULAR_DOG_BREEDS = [
  "Akita",
  "American Bully",
  "American Pit Bull Terrier (Pitbull)",
  "American Staffordshire Terrier",
  "Australian Shepherd (Pastor Australiano)",
  "Basset Hound",
  "Beagle",
  "Bernese Mountain Dog (Boiadeiro Bernês)",
  "Bichon Frisé",
  "Blue Heeler (Boiadeiro Australiano)",
  "Border Collie",
  "Borzoi",
  "Boston Terrier",
  "Boxer",
  "Braco Alemão",
  "Bull Terrier",
  "Bulldog Campeiro",
  "Bulldog Francês",
  "Bulldog Inglês",
  "Cane Corso",
  "Cavalier King Charles Spaniel",
  "Chihuahua",
  "Chow Chow",
  "Cocker Spaniel Americano",
  "Cocker Spaniel Inglês",
  "Collie",
  "Dachshund (Teckel / Salsicha)",
  "Dálmata",
  "Doberman",
  "Dogo Argentino",
  "Dogue Alemão",
  "Dogue de Bordeaux",
  "Fila Brasileiro",
  "Fox Paulistinha (Terrier Brasileiro)",
  "Golden Retriever",
  "Goldendoodle",
  "Husky Siberiano",
  "Jack Russell Terrier",
  "Labrador Retriever",
  "Labradoodle",
  "Lhasa Apso",
  "Maltês",
  "Mastiff Inglês",
  "Mastim Tibetano",
  "Old English Sheepdog",
  "Papillon",
  "Pastor Alemão",
  "Pastor Belga Groenendael",
  "Pastor Belga Malinois",
  "Pastor de Shetland",
  "Pastor Maremano",
  "Pastor Suíço",
  "Pequinês",
  "Pinscher Miniatura",
  "Pit Monster",
  "Pointer Inglês",
  "Poodle",
  "Poodle Gigante (Standard)",
  "Poodle Médio",
  "Poodle Toy",
  "Pug",
  "Red Heeler",
  "Rhodesian Ridgeback",
  "Rottweiler",
  "Samoeida",
  "São Bernardo",
  "Schnauzer Gigante",
  "Schnauzer Miniatura",
  "Schnauzer Standard",
  "Setter Irlandês",
  "Shar-Pei",
  "Shiba Inu",
  "Shih-poo",
  "Shih-tzu",
  "Spitz Alemão (Lulu da Pomerânia)",
  "Staffordshire Bull Terrier",
  "Terra-Nova",
  "Weimaraner",
  "Welsh Corgi Cardigan",
  "Welsh Corgi Pembroke (Corgi)",
  "West Highland White Terrier",
  "Whippet",
  "Yorkshire Terrier"
];

export function searchBreeds(query: string, limit = 6): string[] {
  const clean = query
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  if (!clean) return [];

  const startsWithMatches: string[] = [];
  const containsMatches: string[] = [];

  for (const breed of POPULAR_DOG_BREEDS) {
    const normalizedBreed = breed
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    if (normalizedBreed.startsWith(clean)) {
      startsWithMatches.push(breed);
    } else if (normalizedBreed.includes(clean)) {
      containsMatches.push(breed);
    }
  }

  return [...startsWithMatches, ...containsMatches].slice(0, limit);
}
