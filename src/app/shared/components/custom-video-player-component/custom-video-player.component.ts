import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  AfterViewInit,
  HostListener
} from '@angular/core';

@Component({
  selector: 'app-custom-video-player',
  templateUrl: './custom-video-player.component.html',
})
export default class CustomVideoPlayerComponent implements AfterViewInit {
  @Input() videoSrc: string = '';
  @ViewChild('player') videoRef!: ElementRef<HTMLVideoElement>;
  @ViewChild('playerWrapper') wrapperRef!: ElementRef<HTMLDivElement>;

  isPlaying = false;
  isFullscreen = false;
  volume = 0.5;
  currentTime = '0:00';
  duration = '0:00';
  controlsVisible = true;

  private hideTimeout: any;

  get videoElement() {
    return this.videoRef?.nativeElement;
  }

  ngAfterViewInit(): void {
    this.videoElement.volume = this.volume;
    this.startHideTimer();
  }

  togglePlay() {
    const video = this.videoElement;
    if (video.paused) {
      video.play();
      this.isPlaying = true;
    } else {
      video.pause();
      this.isPlaying = false;
    }
  }

  updateProgress() {
    this.currentTime = this.formatTime(this.videoElement.currentTime);
  }

  updateDuration() {
    this.duration = this.formatTime(this.videoElement.duration);
  }

  seekTo(event: Event) {
    const input = event.target as HTMLInputElement;
    this.videoElement.currentTime = parseFloat(input.value);
  }

  setVolume(event: Event) {
    const input = event.target as HTMLInputElement;
    this.volume = parseFloat(input.value);
    this.videoElement.volume = this.volume;
  }

  toggleFullscreen() {
    const wrapper = this.wrapperRef.nativeElement as HTMLElement;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      wrapper.requestFullscreen();
    }
  }

  onFullscreenChange() {
    this.isFullscreen = !!document.fullscreenElement;
  }

  // 👇 Автоматическое скрытие
  handleMouseMove() {
    this.controlsVisible = true;
    clearTimeout(this.hideTimeout);
    this.startHideTimer();
  }

  private startHideTimer() {
    this.hideTimeout = setTimeout(() => {
      this.controlsVisible = false;
    }, 2500); // скрыть через 2.5 секунды
  }

  formatTime(seconds: number): string {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${min}:${sec}`;
  }
}
