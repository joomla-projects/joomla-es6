/**
 * @copyright   Copyright (C) 2005 - 2017 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

((() => {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    const folders = document.querySelectorAll('.folder-url, .component-folder-url, .layout-folder-url');

    // Hide all the folders when the page loads
    const innerLists = document.querySelectorAll('.folder ul, .component-folder ul, .layout-folder ul');
    for (let i = 0, l = innerLists.length; i < l; i++) {
      innerLists[i].style.display = 'none';
    }

    // Show all the lists in the path of an open file
    const openLists = document.querySelectorAll('.show > ul');
    for (let i = 0, l = openLists.length; i < l; i++) {
      openLists[i].style.display = 'block';
    }

    // Stop the default action of anchor tag on a click event and release the inner list
    for (let i = 0, l = folders.length; i < l; i++) {
      folders[i].addEventListener('click', function(event) {
        event.preventDefault();

        const list = this.parentNode.querySelector('ul');

        if (list.style.display !== 'none') {
          list.style.display = 'none';
        } else {
          list.style.display = 'block';
        }
      });
    }

    // File modal tree selector
    const fileModalFolders = document.querySelectorAll('#fileModal .folder-url');
    for (let i = 0, l = fileModalFolders.length; i < l; i++) {
      fileModalFolders[i].addEventListener('click', event => {
        event.preventDefault();

        for (let i = 0, l = fileModalFolders.length; i < l; i++) {
          fileModalFolders[i].classList.remove('selected');
        }

        event.target.classList.add('selected');

        const listElsAddressToAdd = [].slice.call(document.querySelectorAll('#fileModal input.address'));

        listElsAddressToAdd.forEach(element => {
          element.value = event.target.getAttribute('data-id');
        });
      });
    }

    // Folder modal tree selector
    const folderModalFolders = document.querySelectorAll('#fileModal .folder-url');
    for (let i = 0, l = folderModalFolders.length; i < l; i++) {
      folderModalFolders[i].addEventListener('click', event => {
        event.preventDefault();

        for (let i = 0, l = folderModalFolders.length; i < l; i++) {
          folderModalFolders[i].classList.remove('selected');
        }

        event.target.classList.add('selected');

        const listElsAddressToAdd = [].slice.call(document.querySelectorAll('#fileModal input.address'));

        listElsAddressToAdd.forEach(element => {
          element.value = event.target.getAttribute('data-id');
        });
      });
    }

    const treeContainer = document.querySelector('#treeholder .treeselect');
    const listEls = treeContainer.querySelectorAll('.folder.show');
    const filePathEl = document.querySelector('p.lead.hidden.path');

    if (filePathEl) {
      let filePathTmp = document.querySelector('p.lead.hidden.path').innerText;
    }

    if (filePathTmp && filePathTmp.charAt(0) === '/') {
      filePathTmp = filePathTmp.slice(1);
      filePathTmp = filePathTmp.split('/');
      filePathTmp = filePathTmp[filePathTmp.length - 1];
      const re = new RegExp(filePathTmp);

      for (let i = 0, l = listEls.length; i < l; i++) {
        listEls[i].querySelector('a').classList.add('active');
        if (i === listEls.length - 1) {
          const parentUl = listEls[i].querySelector('ul');
          const allLi = parentUl.querySelectorAll('li');

          for (let i = 0, l = allLi.length; i < l; i++) {
            const aEl = allLi[i].querySelector('a');
            const spanEl = aEl.querySelector('span');

            if (spanEl && re.test(spanEl.innerText)) {
              aEl.classList.add('active');
            }
          }
        }
      }
    }

    // Image cropper
    const image = document.getElementById('image-crop');
    if (image) {
      const width = document.getElementById('imageWidth').value;
      const height = document.getElementById('imageHeight').value;

      const cropper = new Cropper(image, {
        viewMode: 0,
        scalable: true,
        zoomable: true,
        minCanvasWidth: width,
        minCanvasHeight: height,
      });

      image.addEventListener('crop', e => {
        document.getElementById('x').value = e.detail.x;
        document.getElementById('y').value = e.detail.y;
        document.getElementById('w').value = e.detail.width;
        document.getElementById('h').value = e.detail.height;
      });
    }
  });
}))();
