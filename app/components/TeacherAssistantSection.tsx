import Link from 'next/link';

interface Resource {
    title: string;
    subtitle: string;
    url: string;
    icon: JSX.Element; // Cambio aquí
}

const teacherResources: Resource[] = [
    {
        title: 'Emergencias',
        subtitle: 'Protocolos para situaciones de emergencia.',
        url: '/assistant/emergency',
        icon: (
            <svg className="w-10 h-10 flex-shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title></title> <g id="Complete"> <g id="alert-circle"> <g> <line fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.4" x1="12" x2="12" y1="8" y2="12"></line> <line fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.4" x1="12" x2="12" y1="16" y2="16"></line> <circle cx="12" cy="12" data-name="--Circle" fill="none" id="_--Circle" r="10" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.4"></circle> </g> </g> </g> </g></svg>),
    },
    {
        title: 'Protocolo para Emergencias Médicas',
        subtitle: 'Conoce los pasos a seguir en caso de una emergencia médica en el aula.',
        url: '/assistant/emergency/medical',
        icon: (
            <svg className="w-10 h-10 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M2 14C2 10.2288 2 8.34315 3.17157 7.17157C4.34315 6 6.22876 6 10 6H14C17.7712 6 19.6569 6 20.8284 7.17157C21.4816 7.82475 21.7706 8.69989 21.8985 10M22 14C22 17.7712 22 19.6569 20.8284 20.8284C19.6569 22 17.7712 22 14 22H10C6.22878 22 4.34314 22 3.17157 20.8284C2.51839 20.1752 2.22937 19.3001 2.10149 18" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"></path> <path d="M16 6C16 4.11438 16 3.17157 15.4142 2.58579C14.8284 2 13.8856 2 12 2C10.1144 2 9.17157 2 8.58579 2.58579C8 3.17157 8 4.11438 8 6" stroke="#1C274C" stroke-width="1.5"></path> <path d="M13.5 14H10.5M12 12.5V15.5" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"></path> <circle cx="12" cy="14" r="4" stroke="#1C274C" stroke-width="1.5"></circle> </g></svg>
        ),
    },
    {
        title: 'Manejo de Situaciones de Bullying',
        subtitle: 'Descubre las mejores prácticas para abordar y prevenir el bullying en el colegio.',
        url: 'assistant/bullying',
        icon: (
            <svg className="w-10 h-10 flex-shrink-0" fill="#000000" height="200px" width="200px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512.00 512.00" stroke="#000000" stroke-width="0.005120019999999999"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <g> <path d="M509.984,238.166c-4.096-17.323-13.867-31.829-26.773-39.808c-9.472-5.824-20.203-7.68-30.357-5.333 c-0.893,0.217-2.297,0.646-3.985,1.199c-18.594-44.893-47.654-77.878-84.582-99.977c-3.132-1.874-6.294-3.643-9.479-5.328 l6.225-16.75c4.105-11.044-1.521-23.324-12.565-27.429c-11.044-4.105-23.324,1.521-27.429,12.565l-5.786,15.568 c-7.173-2.11-14.393-3.847-21.627-5.222c-5.805-1.104-11.257-1.921-16.291-2.501V42.668c0-11.782-9.551-21.333-21.333-21.333 s-21.333,9.551-21.333,21.333v23.202c-11.592,1.744-24.289,4.779-37.604,9.455l-5.713-17.291 c-3.696-11.187-15.762-17.26-26.949-13.563c-11.187,3.696-17.26,15.762-13.563,26.949l7.226,21.87 c-3.667,2.116-7.344,4.363-11.023,6.755c-7.646,4.972-14.945,10.398-21.889,16.27l-24.739-24.739 c-8.331-8.331-21.839-8.331-30.17,0s-8.331,21.839,0,30.17l25.262,25.262c-20.352,25.81-35.724,57.463-45.085,95.342 c-5.289-0.828-6.856-0.829-7.752-0.829C17.536,241.522,0,265.031,0,298.674c0,33.621,17.536,57.131,42.667,57.131 c1.617,0,4.128-0.249,7.112-0.645c6.084,22.505,16.034,43.765,29.761,62.697c35.463,48.866,90.324,72.811,176.461,72.811 c82.41,0,138.218-29.267,176.455-81.955c21.878-30.174,34.185-66.248,36.484-103.867c1.169,0.035,2.195,0.052,3.093,0.052 c4.267,0,5.739-0.363,7.275-0.725C503.904,298.305,517.365,269.313,509.984,238.166z M397.918,383.66 c-30.309,41.764-73.36,64.341-141.918,64.341c-73.295,0-115.111-18.252-141.924-55.197 c-13.379-18.452-22.196-39.927-26.224-62.755c-0.029-0.888-0.093-1.782-0.236-2.682c-2.987-18.773-2.837-37.824,0.427-56.555 c0.078-0.45,0.117-0.896,0.166-1.344c0.026-0.145,0.048-0.289,0.075-0.434c6.975-37.699,20.016-68.091,38.059-92.175 c8.18,4.829,18.881,3.754,25.909-3.274c7.246-7.246,8.182-18.405,2.823-26.672c4.869-3.968,9.944-7.668,15.223-11.1 c0.499-0.325,1.004-0.635,1.505-0.954c3.761,11.079,15.759,17.074,26.889,13.396c11.187-3.696,17.26-15.762,13.563-26.949 l-1.681-5.086c6.563-2.262,13.174-4.145,19.786-5.665c1.559-0.358,3.067-0.686,4.525-0.987 c1.419,10.406,10.318,18.431,21.113,18.431c11.366,0,20.629-8.896,21.271-20.101c7.332,0.971,15.12,2.542,23.17,4.824 l-0.438,1.179c-4.105,11.044,1.521,23.324,12.565,27.429c10.852,4.033,22.892-1.332,27.202-11.998 c0.869,0.5,1.738,1.006,2.607,1.526c32.852,19.659,57.904,50.203,72.549,94.409c0.165,0.91,0.368,1.819,0.658,2.723 c3.563,11.093,6.208,21.525,8.128,31.915c1.259,6.805,2.069,14.187,2.539,23.211c0.043,0.887,0.158,1.752,0.306,2.607 C427.829,321.417,418.014,355.943,397.918,383.66z"></path> <path d="M354.554,367.258c-5.831-4.604-11.839-8.573-18.011-11.914c-42.566-23.04-87.165-15.086-128.685,10.923 c-14.106,8.837-24.712,17.713-30.989,24.028c-8.306,8.356-8.265,21.864,0.091,30.17c8.356,8.306,21.864,8.265,30.17-0.091 c0.864-0.87,2.87-2.727,5.872-5.239c5.164-4.322,11.054-8.668,17.507-12.71c29.827-18.685,59.189-23.921,85.724-9.558 c3.996,2.163,7.956,4.779,11.88,7.878c9.247,7.301,22.662,5.724,29.964-3.523C365.378,387.974,363.801,374.559,354.554,367.258z"></path> <path d="M234.667,277.334c0-20.952-10.061-39.545-25.615-51.219c2.677-3.565,4.282-7.98,4.282-12.781 c0-11.782-9.551-21.333-21.333-21.333h-54.251c-11.782,0-21.333,9.551-21.333,21.333c0,7.54,3.922,14.152,9.827,17.946 c-12.063,11.639-19.576,27.961-19.576,46.054c0,35.355,28.645,64,64,64S234.667,312.69,234.667,277.334z M149.333,277.334 c0-11.791,9.542-21.333,21.333-21.333S192,265.543,192,277.334c-11.776,0-21.333,9.557-21.333,21.333 C158.875,298.668,149.333,289.126,149.333,277.334z"></path> <path d="M320,213.334c-4.835,0-9.537,0.553-14.065,1.568l29.15-29.15c8.331-8.331,8.331-21.839,0-30.17s-21.839-8.331-30.17,0 l-42.667,42.667c-8.331,8.331-8.331,21.839,0,30.17c2.994,2.994,6.66,4.894,10.511,5.736C262.351,245.536,256,260.69,256,277.334 c0,35.355,28.645,64,64,64s64-28.645,64-64S355.355,213.334,320,213.334z M298.667,277.334c0-11.791,9.542-21.333,21.333-21.333 s21.333,9.542,21.333,21.333c-11.776,0-21.333,9.557-21.333,21.333C308.209,298.668,298.667,289.126,298.667,277.334z"></path> </g> </g> </g> </g></svg>),
    },
    {
        title: 'Uso de Instalaciones Escolares',
        subtitle: 'Información sobre cómo y cuándo usar las diferentes instalaciones del colegio.',
        url: 'assistant/facilities',
        icon: (
            <svg className="w-10 h-10 flex-shrink-0" fill="#000000" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>school</title> <path d="M30 21.25h-6.25v-8.957l5.877 3.358c0.107 0.062 0.236 0.098 0.373 0.099h0c0.414-0.001 0.749-0.336 0.749-0.751 0-0.277-0.15-0.519-0.373-0.649l-0.004-0.002-13.623-7.784v-0.552c0.172 0.016 0.35 0.068 0.519 0.068 0.004 0 0.010 0 0.015 0 0.475 0 0.934-0.067 1.368-0.193l-0.035 0.009c0.323-0.063 0.693-0.099 1.073-0.099 0.392 0 0.775 0.039 1.146 0.112l-0.037-0.006c0.039 0.007 0.083 0.012 0.129 0.012 0.184 0 0.352-0.068 0.479-0.181l-0.001 0.001c0.161-0.139 0.263-0.343 0.264-0.571v-2.812c0 0 0-0 0-0 0-0.355-0.247-0.653-0.579-0.73l-0.005-0.001c-0.419-0.111-0.9-0.176-1.396-0.176-0.5 0-0.985 0.065-1.446 0.187l0.039-0.009c-0.288 0.067-0.618 0.105-0.958 0.105-0.231 0-0.457-0.018-0.678-0.052l0.025 0.003c-0.122-0.256-0.378-0.43-0.676-0.43-0.412 0-0.746 0.334-0.746 0.746 0 0.001 0 0.003 0 0.004v-0 4.565l-13.622 7.784c-0.227 0.132-0.378 0.374-0.378 0.651 0 0.414 0.336 0.75 0.75 0.75 0.137 0 0.265-0.037 0.376-0.101l-0.004 0.002 5.878-3.359v8.957h-6.25c-0.414 0-0.75 0.336-0.75 0.75v0 8c0 0.414 0.336 0.75 0.75 0.75h28c0.414-0 0.75-0.336 0.75-0.75v0-8c-0-0.414-0.336-0.75-0.75-0.75v0zM18.658 3.075c0.298-0.082 0.64-0.13 0.993-0.13 0.183 0 0.363 0.013 0.539 0.037l-0.020-0.002v1.339c-0.16-0.013-0.345-0.021-0.533-0.021-0.489 0-0.966 0.052-1.425 0.151l0.044-0.008c-0.304 0.088-0.653 0.139-1.014 0.139-0.174 0-0.344-0.012-0.512-0.034l0.020 0.002v-1.323c0.15 0.014 0.325 0.021 0.502 0.021 0.499 0 0.984-0.062 1.447-0.18l-0.041 0.009zM2.75 22.75h5.5v6.5h-5.5zM9.75 22v-10.564l6.25-3.571 6.25 3.572v17.814h-2.5v-5.25c-0-0.414-0.336-0.75-0.75-0.75h-6c-0.414 0-0.75 0.336-0.75 0.75v0 5.25h-2.5zM13.75 29.25v-4.5h4.5v4.5zM29.25 29.25h-5.5v-6.5h5.5zM16 19.75c2.071 0 3.75-1.679 3.75-3.75s-1.679-3.75-3.75-3.75c-2.071 0-3.75 1.679-3.75 3.75v0c0.002 2.070 1.68 3.748 3.75 3.75h0zM16 13.75c1.243 0 2.25 1.007 2.25 2.25s-1.007 2.25-2.25 2.25c-1.243 0-2.25-1.007-2.25-2.25v0c0.002-1.242 1.008-2.248 2.25-2.25h0z"></path> </g></svg>),
    },
    {
        title: 'Evaluaciones y Criterios de Calificación',
        subtitle: 'Entiende cómo se evalúa a los estudiantes y los criterios de calificación adoptados.',
        url: 'assistant/evaluations',
        icon: (
            <svg className="w-10 h-10 flex-shrink-0" viewBox="0 0 800 800" enable-background="new 0 0 800 800" id="GUIDE" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M676.637,183.386c0.002-0.002,0.004-0.004,0.005-0.005L522.549,29.287c-3.619-3.62-8.62-5.86-14.145-5.86H137.5 c-11.046,0-20,8.954-20,20v713.146c0,11.046,8.954,20,20,20h525c11.046,0,20-8.954,20-20V197.522 C682.5,192.407,680.426,187.203,676.637,183.386z M642.5,736.573h-485V63.427h342.62l114.096,114.095l-85.812,0v-41.788 c0-11.046-8.954-20-20-20s-20,8.954-20,20v61.788c0,11.046,8.954,20,20,20c0,0,92.404,0,134.096,0V736.573z"></path> <path d="M295.217,224.417l-39.854,39.855l-5.697-5.697c-7.811-7.811-20.473-7.811-28.283,0c-7.811,7.81-7.811,20.473,0,28.284 l19.84,19.84c3.75,3.751,8.838,5.858,14.142,5.858c5.305,0,10.392-2.107,14.143-5.858l53.996-53.999 c7.81-7.811,7.81-20.474-0.001-28.284C315.69,216.606,303.027,216.606,295.217,224.417z"></path> <path d="M557.831,312.557h6.646c11.046,0,20-8.954,20-20s-8.954-20-20-20h-6.646c-11.046,0-20,8.954-20,20 S546.785,312.557,557.831,312.557z"></path> <path d="M367.389,272.557c-11.046,0-20,8.954-20,20s8.954,20,20,20h129.609c11.046,0,20-8.954,20-20s-8.954-20-20-20H367.389z"></path> <path d="M557.831,435.552h6.646c11.046,0,20-8.954,20-20s-8.954-20-20-20h-6.646c-11.046,0-20,8.954-20,20 S546.785,435.552,557.831,435.552z"></path> <path d="M496.998,395.552H367.389c-11.046,0-20,8.954-20,20s8.954,20,20,20h129.609c11.046,0,20-8.954,20-20 S508.044,395.552,496.998,395.552z"></path> <path d="M557.831,558.547h6.646c11.046,0,20-8.954,20-20s-8.954-20-20-20h-6.646c-11.046,0-20,8.954-20,20 S546.785,558.547,557.831,558.547z"></path> <path d="M496.998,518.547H367.389c-11.046,0-20,8.954-20,20s8.954,20,20,20h129.609c11.046,0,20-8.954,20-20 S508.044,518.547,496.998,518.547z"></path> <path d="M557.831,681.542h6.646c11.046,0,20-8.954,20-20s-8.954-20-20-20h-6.646c-11.046,0-20,8.954-20,20 S546.785,681.542,557.831,681.542z"></path> <path d="M496.998,641.542H367.389c-11.046,0-20,8.954-20,20s8.954,20,20,20h129.609c11.046,0,20-8.954,20-20 S508.044,641.542,496.998,641.542z"></path> <path d="M255.363,435.552c5.304,0,10.392-2.107,14.142-5.858l53.996-53.996c7.811-7.811,7.811-20.475,0-28.285 s-20.473-7.811-28.283,0l-39.854,39.855l-5.697-5.698c-7.81-7.81-20.474-7.812-28.284-0.001s-7.811,20.474-0.001,28.284 l19.84,19.841C244.972,433.444,250.059,435.552,255.363,435.552z"></path> <path d="M234.239,511.547l-12.856,12.857c-7.81,7.811-7.81,20.474,0.001,28.284c3.905,3.905,9.023,5.857,14.142,5.857 s10.237-1.952,14.143-5.858l12.855-12.855l12.856,12.855c3.904,3.906,9.023,5.858,14.142,5.858s10.237-1.952,14.142-5.858 c7.811-7.811,7.811-20.473,0-28.283l-12.855-12.857l12.856-12.857c7.81-7.811,7.81-20.474-0.001-28.284 c-7.811-7.81-20.474-7.81-28.284,0.001l-12.856,12.856l-12.857-12.856c-7.811-7.811-20.473-7.811-28.283,0s-7.811,20.474,0,28.283 L234.239,511.547z"></path> <path d="M295.217,593.4l-39.854,39.855l-5.697-5.697c-7.811-7.811-20.473-7.811-28.283,0c-7.811,7.81-7.811,20.473,0,28.283 l19.84,19.84c3.75,3.752,8.838,5.858,14.142,5.858c5.305,0,10.392-2.107,14.143-5.858l53.996-53.998 c7.81-7.811,7.81-20.474-0.001-28.284C315.69,585.59,303.027,585.59,295.217,593.4z"></path> </g> </g></svg>),
    },
];

export default function TeacherAssistantSection() {
    return (
        <div className='flex flex-col gap-8 text-foreground mx-8'>
            <h2 className='text-center text-lg font-bold'>
                Asistente para Profesores
            </h2>
            <p className='text-center'>
                Encuentra rápidamente respuestas a tus preguntas sobre el RICE.
            </p>

            {/* Búsqueda Inteligente */}
            <div className='mb-6'>
                <input
                    type='text'
                    placeholder='Escribe tu pregunta o palabra clave...'
                    className='w-full p-3 rounded-lg border focus:border-foreground'
                />
            </div>

            <div className='grid grid-cols-1 gap-4 lg:grid-cols-3'>
                {teacherResources.map(({ title, subtitle, url, icon }) => (
                    <Link href={url} key={title} passHref>
                        <div className='group relative flex flex-col rounded-lg border p-6 hover:border-foreground cursor-pointer'>
                            <h3 className='mb-2 min-h-[40px] font-bold lg:min-h-[60px]'>
                                {title}
                            </h3>
                            <p className='text-sm opacity-70'>{subtitle}</p>
                            <div className='flex items-center justify-between'>
                                {icon}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>


            {/* Feedback y Mejora Continua */}
            <div className='mt-6 self-center'>
                <h4 className='mb-2 font-medium'>¿Fue útil esta respuesta?</h4>
                <div className='flex gap-4 justify-center'>
                    <button className='px-4 py-2 rounded-lg border'>Sí</button>
                    <button className='px-4 py-2 rounded-lg border'>No</button>
                </div>
            </div>
        </div>
    );
}