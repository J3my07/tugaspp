document.addEventListener('DOMContentLoaded', () => {
    const infoModal = document.getElementById('infoModal');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    const mBadge = document.getElementById('mBadge');
    const mTitle = document.getElementById('mTitle');
    const mSubtitle = document.getElementById('mSubtitle');
    const mIcon = document.getElementById('mIcon');
    const mDesc = document.getElementById('mDesc');
    const mModulesBox = document.getElementById('mModulesBox');
    const mModulesList = document.getElementById('mModulesList');
    const mLocalPdf = document.getElementById('mLocalPdf');
    const mVerifyLink = document.getElementById('mVerifyLink');
    const mActions = document.getElementById('mActions');

    function openCertModal({ title, issuer, date, localPath, verifyUrl, modules }) {
        mBadge.textContent = 'VERIFIED CERTIFICATE';
        mTitle.textContent = title;
        mSubtitle.textContent = `${issuer} • ${date}`;
        mIcon.className = 'fas fa-award modal-icon';
        mDesc.innerHTML = `Kredensial resmi atas nama <strong>Jemi Syaputra</strong>. Klik tombol di bawah untuk membuka dokumen PDF dari <code>${localPath}</code> atau menuju portal verifikasi penerbit.`;

        if (modules && modules.length > 0) {
            mModulesList.innerHTML = '';
            modules.forEach((mod) => {
                const li = document.createElement('li');
                li.textContent = mod;
                mModulesList.appendChild(li);
            });
            mModulesBox.classList.remove('hidden');
        } else {
            mModulesBox.classList.add('hidden');
        }

        mLocalPdf.href = localPath;
        mVerifyLink.href = verifyUrl;
        mActions.classList.remove('hidden');
        infoModal.classList.add('active');
    }

    function openProjectDetail({ title, description }) {
        mBadge.textContent = 'PROJECT DOCUMENTATION';
        mTitle.textContent = title;
        mSubtitle.textContent = 'Telkom University • Engineering Portfolio';
        mIcon.className = 'fas fa-project-diagram modal-icon';
        mDesc.textContent = description;

        mModulesBox.classList.add('hidden');
        mActions.classList.add('hidden');
        infoModal.classList.add('active');
    }

    function closeModal() {
        infoModal.classList.remove('active');
    }

    // Event listener untuk tombol Sertifikat
    document.querySelectorAll('.btn-cert').forEach((btn) => {
        btn.addEventListener('click', () => {
            const rawModules = btn.dataset.modules;
            const modules = rawModules ? rawModules.split('|') : [];

            openCertModal({
                title: btn.dataset.title,
                issuer: btn.dataset.issuer,
                date: btn.dataset.date,
                localPath: btn.dataset.pdf,
                verifyUrl: btn.dataset.verify,
                modules
            });
        });
    });

    // Event listener untuk tombol Detail Proyek
    document.querySelectorAll('.btn-project-detail').forEach((btn) => {
        btn.addEventListener('click', () => {
            openProjectDetail({
                title: btn.dataset.title,
                description: btn.dataset.desc
            });
        });
    });

    // Tutup modal via tombol X, klik area luar, atau tombol Escape
    modalCloseBtn.addEventListener('click', closeModal);

    infoModal.addEventListener('click', (event) => {
        if (event.target === infoModal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && infoModal.classList.contains('active')) {
            closeModal();
        }
    });

    // Penanda navigasi aktif otomatis saat halaman di-scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.sidebar-nav a');

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    navLinks.forEach((link) => {
                        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                    });
                }
            });
        },
        { rootMargin: '-25% 0px -65% 0px' }
    );

    sections.forEach((section) => observer.observe(section));
});