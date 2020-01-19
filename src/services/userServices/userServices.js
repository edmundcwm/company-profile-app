import axios from 'axios';
import settings from '../../settings/settings';
import Cookies from 'js-cookie';

function getByEmail(cancelToken, endpoint) {
  return axios({
    url: settings.restRoute + endpoint + Cookies.get('user_email'),
    method: 'get',
    headers: { Authorization: 'Bearer ' + Cookies.get(settings.token) },
    cancelToken
  });
}

function getByID(cancelToken) {
  return axios({
    url: settings.restRoute + 'nerbcrmwp/v1/company-profile/' + Cookies.get('user_id'),
    method: 'get',
    headers: { Authorization: 'Bearer ' + Cookies.get(settings.token) },
    cancelToken
  });
}

function updateByID(data) {
  return axios({
    url: settings.restRoute + 'nerbcrmwp/v1/company-profile/' + Cookies.get('user_id'),
    method: 'put',
    data,
    headers: { Authorization: 'Bearer ' + Cookies.get(settings.token) }
  });
}

function uploadMedia(media) {
  let xhr = [];
  for (let i = 0; i < media.length; ++i) {
    const formData = new FormData();
    formData.append('file', media[i].file);
    //store info like employeeID in the 'caption' field of the image so we can attach the image to the correct user on the frontend
    //other info includes "scanned_ic", "company_bizprofile" label. This info is required in order to update the correct attachments
    if (media[i].hasOwnProperty('meta')) {
      formData.append('caption', media[i].meta);
    }
    xhr.push(
      axios({
        url: settings.restRoute + 'wp/v2/media',
        method: 'post',
        data: formData,
        headers: { Authorization: 'Bearer ' + Cookies.get(settings.token) }
      })
    );
  }

  return axios.all(xhr);
}

export const UserServices = {
  getByEmail,
  getByID,
  updateByID,
  uploadMedia
};
