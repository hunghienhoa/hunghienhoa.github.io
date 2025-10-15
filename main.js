document.addEventListener('DOMContentLoaded',()=>{
  document.querySelectorAll('.tab_navigation button').forEach(btn=>{
    btn.addEventListener('click',()=>{
      document.querySelectorAll('.tab_navigation li').forEach(li=>li.classList.remove('active'));
      btn.parentElement.classList.add('active');
      const tab=btn.dataset.tab;
      document.querySelectorAll('#links,#videos,#products').forEach(sec=>sec.classList.add('hidden'));
      document.getElementById(tab).classList.remove('hidden');
    });
  });
  const shareBtn=document.querySelector('.share_link_button');
  const shareModal=document.getElementById('shareModal');
  const closeShare=document.getElementById('closeShare');
  shareBtn&&shareBtn.addEventListener('click',()=>shareModal.classList.remove('hidden'));
  closeShare&&closeShare.addEventListener('click',()=>shareModal.classList.add('hidden'));
});