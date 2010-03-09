<?php
// System
$lang["Calendar"] = "Evento";

// Fields
 // Basic Data
$lang["Title"] = "Título";
$lang["Place"] = "Lugar";
$lang["Notes"] = "Notas";
$lang["Start"] = "Comienzo";
$lang["End"] = "Fin";
$lang["Visibility"] = "Visibilidad";
$lang["Public"] = "Público";
$lang["Private"] = "Privado";
$lang["Status"] = "Estado";
$lang["Pending"] = "Pendiente";
$lang["Accepted"] = "Aceptado";
$lang["Rejected"] = "Rechazado";
 // Participants
$lang["Participants"] = "Participantes";
 // Recurrence
$lang["Recurrence"] = "Repetición";
$lang["Repeats"] = "Repeticiones";
$lang["None"] = "Ninguna";
$lang["Once"] = "Una vez";
$lang["Daily"] = "Diaria";
$lang["Weekly"] = "Semanal";
$lang["Monthly"] = "Mensual";
$lang["Yearly"] = "Anual";
$lang["Interval"] = "Intervalo";
$lang["Until"] = "Hasta";
$lang["Weekdays"] = "Días de la semana";
$lang["Rrule"] = "Regla de recurrencia";

// Messages
  // System
$lang["Wrong Recurrence Interval"] = "Intervalo erróneo de Recurrencia";
$lang["Incomplete Recurrence Until field"] = "Campo Hasta en Recurrencia incompleto";
$lang["Event duration"] = "Duración del evento";
$lang["End date and time has to be after Start date and time"] = "La fecha y hora de Fin debe ser posterior a la fecha"
    . "y hora de Inicio";
  // View
$lang["You have to select at least one user!"] = "Debe elegir al menos un usuario!";
$lang["Edit repeating events"] = "Editar eventos recurrentes";
$lang["Delete repeating events"] = "Borrar eventos recurrentes";
$lang["Edit just this occurrence"] = "Editar este evento";
$lang["Delete just this occurrence"] = "Borrar este evento";
$lang["Edit all occurrences"] = "Editar todos los eventos";
$lang["Delete all occurrences"] = "Borrar todos los eventos";
$lang["To whom will this apply"] = "A quién se aplicará esto";
$lang["Edit just for me"] = "Editar solo para mí";
$lang["Edit for all participants"] = "Editar para todos los participantes";
$lang["Delete just for me"] = "Borrar solo para mí";
$lang["Delete for all participants"] = "Borrar para todos los participantes";

// View
$lang["Change date"] = "Cambiar fecha";
$lang["Today"] = "Hoy";
$lang["Self"] = "Propio";
$lang["Selection"] = "Selección";
$lang["User selection"] = "Selección de usuario";
$lang["Done"] = "Listo";
$lang["List"] = "Lista";
$lang["Day"] = "Día";
$lang["Week"] = "Semana";
$lang["Month"] = "Mes";
$lang["Calendar week"] = "Calendario semanal";
$lang["Further events"] = "Otros eventos";
$lang["Select users for the group view"] = "Elija los usuarios para la vista grupal";

// Tooltip Help
 // 'Interval' field
$lang["The interval for the option selected in Repeats."] = "El intervalo para la opción seleccionada en "
    . "Repeticiones.";
$lang["E.g.: Repeats Weekly - Interval 2, that will create one event every 2 weeks."] = "Ej.: Repeticiones Semanal - "
    . "Intervalo 2, se creará un evento cada 2 semanas.";
 // 'Until' field
$lang["The day the recurrence will stop happening."] = "El día en que la recurrencia terminará.";
$lang["The last event's day could not match this day."] = "El día del último evento puede no coincidir con este "
    . "día.";

// General Help
$lang["Content Help"]["General"] = "DEFAULT";
$lang["Content Help"]["Evento"] = "<br />
    Esta es la <b>Ayuda General del módulo Evento</b><br />
    <br />
    El módulo Evento es una forma muy completa de administrar eventos. Puede crear uno, ingresar información
    descriptiva sobre él, asignarle fecha y hora, especificar participantes, crearle recurrencia y el resto de
    propiedades generales de los módulos, como permisos de Acceso, Notificación por email e Historial.<br />
    <br />
    La <b>pantalla</b> se divide en 5 secciones:<br />
    <br />
    <ol>
        <li><b>Botonera superior derecha:</b> aquí, según los ítems mostrados y los permisos del usuario,
            se mostrarán
            hasta 3 botones.<br />
            <ul>
                <li><b>Agregar:</b> lo presiona y un formulario vacío se abre para que cree un nuevo evento.<br />
                <li><b>Grabar:</b> la grilla puede ser editada sólo cliqueando en los campos que desee cambiar. Luego
                    presiona este botón para grabar los cambios hechos.<br />
                <li><b>Exportar:</b> exporta a un archivo CSV los resultados y ofrece descargarlo.<br />
            </ul>
        <li><b>Solapas de Vistas:</b> hay cuatro tipos de listados que se activan por medio de estas solapas.<br />
            <ul>
                <li><b>Lista:</b> una grilla con todos los eventos para el usuario logueado.<br />
                <li><b>Día:</b> una agenda desde las 8:00 hasta las 20:00 hs. donde se muestran todos los eventos de un
                    día determinado.<br />
                    <u>Tiene dos subtipos</u> que son elegidos a través de las solapas <b>Propio</b> y
                    <b>Selección</b>
                    que aparecen a la derecha de la misma barra, cuando el modo <b>Día</b> está activo:
                    <ul>
                        <li><b>Propio:</b> se muestran los eventos del día elegido, para el usuario activo.
                        <li><b>Selección:</b> cuando se presiona este botón, una ventana emergente aparece
                            permitiendo al usuario seleccionar un pequeño grupo de gente de modo que la lista de
                            eventos contendrá
                            tantas columnas como usuarios elegidos; se verá una agenda grupal para el día activo.
                    </ul>
                <li><b>Semana:</b> una agenda semanal, igual la diaria pero para los siete días de la semana
                    simultáneamente.
                <li><b>Mes:</b> una agenda mensual que expone en un formato claro de calendario todos los días
                    del mes,
                    más los días necesarios del mes anterior y siguiente para completar todas las semanas mostradas.
            </ul>
            Cuando Día, Semana o Mes son la vista activa, aparece una barra adicional sobre los listados. Esta tiene
            los vínculos <i>previo</i>, <i>hoy</i> y <i>siguiente</i>, para cambiar el día / semana / mes
            secuencialmente. Además muestra la fecha del período seleccionado.<br />
            <br />
        <li><b>Grilla / Lista:</b> aquí se muestra la lista de ítems o la agenda de un día determinado,
            según la vista elegida.<br />
        <br />
        <li><b>Formulario:</b> cuando un ítem esta por ser creado o se cliquea en uno del listado, un formulario se
            muestra aquí para completar o modificar sus datos.<br />
        <br />
        <li><b>Botonera inferior:</b> aquí, según los permisos del usuario, cuando un ítem está siendo creado o
            modificado se muestran los botones <b>Grabar</b> y <b>Borrar</b>.<br />
    </ol>
    <br />
    <br />";

$lang["Content Help"]["Datos Básicos"] = "DEFAULT";
$lang["Content Help"]["Repetición"] = "<br />
    <b>Solapa Repetición</b><br />
    <br />
    Esta solapa permite asignar repetición al evento para que suceda tantas veces como se especifique, con la
    frecuencia y días de la semana definidos.<br />
    <br />
    <b>Campos</b><br />
    <br />
    <b>Repeticiones</b>: aquí elige cuán seguido quiere que ocurra el evento. <i>Una vez</i> es la
    repetición predeterminada y significa que no habrá repetición. Puede elegir <i>Diario</i>,
    <i>Semanal</i>, <i>Mensual</i> o <i>Anual</i> y el evento se repetirá con dicha frecuencia hasta el día elegido
    en el campo <u>Hasta</u>.<br />
    <br />
    <b>Intervalo</b>: especifique aquí el intervalo que quiere para las repeticiones. Ej.: si elige <i>Mensual</i> en
    el campo <u>Repeticiones</u> y <i>2</i> en <u>Intervalo</u>, el evento sucederá cada 2 meses.<br />
    <br />
    <b>Hasta</b>: si elige una opción distinta a <i>Una vez</i> en el campo <u>Repeticiones</u>, aquí debe elegir
    cuándo quiere que las repeticiones cesen.<br />
    <br />
    <b>Días de la semana</b>: puede elegir qué días de la semana sucederá la repetición del evento.<br />
    <br />
    <br />";

$lang["Content Help"]["Accesos"] = "DEFAULT";
$lang["Content Help"]["Notificación"] = "DEFAULT";
$lang["Content Help"]["Historial"] = "DEFAULT";


