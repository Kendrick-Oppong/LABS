// Array to store image data using Picsum images
const images = [
  {
    thumbnail: "https://picsum.photos/id/237/300/300?random=1",
    full: "https://picsum.photos/id/237/900/900?random=1",
    caption: "Image 1",
  },
  {
    thumbnail: "https://picsum.photos/300/300?random=2",
    full: "https://picsum.photos/900/900?random=2",
    caption: "Image 2",
  },
  {
    thumbnail: "https://picsum.photos/300/300?random=3",
    full: "https://picsum.photos/900/900?random=3",
    caption: "Image 3",
  },
  {
    thumbnail: "https://picsum.photos/300/300?random=4",
    full: "https://picsum.photos/900/900?random=4",
    caption: "Image 4",
  },
  {
    thumbnail: "https://picsum.photos/300/300?random=5",
    full: "https://picsum.photos/900/900?random=5",
    caption: "Image 5",
  },
  {
    thumbnail: "https://picsum.photos/300/300?random=6",
    full: "https://picsum.photos/900/900?random=6",
    caption: "Image 6",
  },
    {
        thumbnail: "https://picsum.photos/300/300?random=7",
        full: "https://picsum.photos/900/900?random=7",
        caption: "Image 7",
    }
];


let currentIndex = 0;

// DOM Elements
const gallery = document.getElementById("gallery");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const caption = document.getElementById("caption");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const closeBtn = document.getElementById("closeBtn");

// Function to create and display thumbnails in the gallery using a template literal
const loadGallery = () => {
  const galleryHTML = images
    .map(
      (img, index) => `
        <img 
          src="${img.thumbnail}" 
          alt="${img.caption}" 
          data-index="${index}" 
          class="thumbnail"
          onclick="openLightbox(${index})"
        />
      `
    )
    .join(""); // Join all image elements into a single HTML string

  gallery.innerHTML = galleryHTML; // Insert all images at once
};


// Function to open the lightbox
const openLightbox = (index) => {
  currentIndex = index;
  updateLightbox();
  lightbox.classList.remove("hidden");
};

// Function to close the lightbox
const closeLightbox = () => {
  lightbox.classList.add("hidden");
};

// Function to update lightbox content based on current index
const updateLightbox = () => {
  const imgData = images[currentIndex];
  lightboxImage.src = imgData.full;
  caption.textContent = imgData.caption;

  // Disable buttons at start and end of gallery
  prevBtn.disabled = currentIndex === 0;
  nextBtn.disabled = currentIndex === images.length - 1;
};

// Function to navigate to the next image
const nextImage = () => {
  if (currentIndex < images.length - 1) {
    currentIndex++;
    updateLightbox();
  }
};

// Function to navigate to the previous image
const prevImage = () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateLightbox();
  }
};

// Event Listeners
nextBtn.addEventListener("click", nextImage);
prevBtn.addEventListener("click", prevImage);
closeBtn.addEventListener("click", closeLightbox);

// Initialize gallery on page load
loadGallery();
