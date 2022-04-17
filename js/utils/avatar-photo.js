const avatarPreview = document.querySelector('.ad-form-header__preview');
const phothoPreview = document.querySelector('.ad-form__photo');
const imageTemplate = avatarPreview.querySelector('img');
const avatarPreviewDefault = avatarPreview.querySelector('img').cloneNode(true);
const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const imageOption = {
  avatar: {
    alt: 'Аватар пользователя',
    preview: avatarPreview,
  },
  images:{
    alt:'Фото жилья',
    preview: phothoPreview,
  },
};

const uploadPhoto = (evt) => {
  const target = evt.target;
  const imageClone = imageTemplate.cloneNode(true);
  const [file] = target.files;
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((extension) => fileName.endsWith(extension));

  if(matches){
    const reader = new FileReader();
    reader.addEventListener('load', () =>{
      imageClone.alt = imageOption[target.id].alt;
      imageClone.src = reader.result;
      imageOption[target.id].preview.textContent = '';
      imageOption[target.id].preview.append(imageClone);
    });
    reader.readAsDataURL(file);
  }
};

const resetPhoto = () => {
  phothoPreview.textContent ='';
  avatarPreview.textContent = '';
  avatarPreview.append(avatarPreviewDefault);
};

export { uploadPhoto, resetPhoto };

