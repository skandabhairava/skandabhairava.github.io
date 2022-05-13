<script>
	import MainContent from "./components/MainContent.svelte";
	import TopContact from "./components/TopContact.svelte";
	import BottomContact from "./components/BottomContact.svelte";
</script>

<main>
	<img src="./Terroid.png" alt="Terroid"/>
	<TopContact/>
	<MainContent/>
	<BottomContact/>
</main>

<style>
    img{
        margin-top: -1px;
        border-radius: 10px 10px 0px 0px;
    }
</style>