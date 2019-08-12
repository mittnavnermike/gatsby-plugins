"use strict";

const fetch = require('node-fetch');

const accessToken = '8ce7a91caa25d2af94f2e4cd4ecee30f';

const videos = async () => {
  await new Promise((resolve, reject) => {
    fetch('https://api.vimeo.com/me/videos', {
      headers: {
        Authorization: `bearer ${accessToken}`
      }
    }).then(res => res.json()).then(async res => {
      let pages = Math.ceil(res.total / res.per_page);
      let urls = new Array(pages).fill('x').map((x, i) => new Promise((resolve, reject) => {
        fetch(`https://api.vimeo.com/me/videos?page=${i + 1}`, {
          headers: {
            Authorization: `bearer ${accessToken}`
          }
        }).then(res => res.json()).then(res => resolve(res)).catch(err => reject(err));
      }));
      await Promise.all([...urls]).then(values => {
        console.log('values', values);
        let videos = values.map(value => value.data);
        console.log('videos', videos);
        resolve(videos);
      }).catch(err => reject(err));
    }).catch(err => reject(err));
  });
};

videos();