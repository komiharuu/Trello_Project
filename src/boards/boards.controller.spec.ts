import { Test, TestingModule } from '@nestjs/testing';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { CreateInvitationDto } from './dto/create-invitation.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

// BoardService Mocking
const mockBoardsService = {
  createBoard: jest.fn(),
  getBoardList: jest.fn(),
  getBoardDetail: jest.fn(),
  updateBoard: jest.fn(),
  deleteBoard: jest.fn(),
  createInvitation: jest.fn(),
  acceptInvitation: jest.fn(),
};

// Board DTO
const createBoardDto: CreateBoardDto = {
  title: 'Test',
  description: 'Test ...',
  backgroundColor: '#FFFFFF',
};

const updateBoardDto: UpdateBoardDto = {
  title: 'Test',
  description: 'Test ...',
  backgroundColor: '#FFFFFF',
};

// Create Invitation DTO
const createInvitationDto: CreateInvitationDto = {
  memberEmail: 'test@test.com',
};

// Accept Invitation DTO
const acceptInvitationDto = {
  token: 'ask6dj2fnl12iud3rn',
};

describe('BoardsController', () => {
  let controller: BoardsController;
  let service: BoardsService;

  beforeEach(async () => {
    // 테스트 전에 임시 데이터 초기화
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.restoreAllMocks();

    // 가짜 모듈 생성
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BoardsController],
      providers: [{ provide: BoardsService, useValue: mockBoardsService }],
    }).compile();

    // 만들어진 가짜 모듈에서의 service와 controller를 가져옴
    controller = module.get<BoardsController>(BoardsController);
    service = module.get<BoardsService>(BoardsService);
  });

  // 테스트 후에 임시 데이터 초기화
  afterAll(async () => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('createBoard', () => {
    it('should create board', async () => {
      //GIVEN
      const createBoardResult = {
        id: 1,
        ownerId: 1,
        title: 'Test',
        createdAt: '2024-07-05T23:08:07.001Z',
        updatedAt: '2024-07-05T23:08:07.001Z',
      };

      //WHEN
      // 모킹된 서비스의 createBoard 메서드를 실행하면 createBoardResult 값을 반환한다는 의미
      mockBoardsService.createBoard.mockResolvedValue(createBoardResult);

      //THEN
      // 컨트롤러의 실제 createBoard 메서드의 결과가 createBoardResult와 같은지 확인
      expect(await controller.createBoard(createBoardDto)).toBe(createBoardResult);
      // 컨트롤러에서 서비스의 createBoard 메서드를 사용할 때 다음과 같은 매개변수를 사용하는지 확인
      expect(mockBoardsService.createBoard).toHaveBeenCalledWith(createBoardDto);
    });
  });

  describe('getBoardList', () => {
    it('should get board list', async () => {
      //GIVEN
      const getBoardListResult = [
        {
          id: 1,
          ownerId: 1,
          title: 'Test',
          createdAt: '2024-07-05T23:08:07.001Z',
          updatedAt: '2024-07-05T23:08:07.001Z',
        },
        {
          id: 2,
          ownerId: 1,
          title: 'Test2',
          createdAt: '2024-07-05T23:08:07.001Z',
          updatedAt: '2024-07-05T23:08:07.001Z',
        },
      ];

      //WHEN
      // 모킹된 서비스의 getBoardList 메서드를 실행하면 getBoardListResult 값을 반환한다는 의미
      mockBoardsService.getBoardList.mockResolvedValue(getBoardListResult);

      //THEN
      const response = await controller.getBoardList();
      // getBoardList 메서드의 결과가 배열인지 확인
      expect(response).toBeInstanceOf(Array);
      // 컨트롤러의 실제 getBoardList 메서드의 결과가 getBoardListResult와 같은지 확인
      // expect(response).toBe(getBoardListResult);
    });
  });

  describe('getBoardDetail', () => {
    it('should get board detail', async () => {
      //GIVEN
      const getBoardDetailResult = {
        id: 1,
        ownerId: 1,
        title: 'Test',
        description: 'Test ...',
        backgroundColor: '#FFFFFF',
        isDeleted: false,
        createdAt: '2024-07-05T23:08:07.001Z',
        updatedAt: '2024-07-05T23:08:07.001Z',
      };
      const req = { params: { boardId: 1 } };

      //WHEN
      // 모킹된 서비스의 getBoardDetail 메서드를 실행하면 getBoardDetailResult 값을 반환한다는 의미
      mockBoardsService.getBoardDetail.mockResolvedValue(getBoardDetailResult);

      //THEN
      const response = await controller.getBoardDetail(req.params.boardId);
      // 컨트롤러의 실제 getBoardDetail 메서드의 결과가 getBoardDetailResult와 같은지 확인
      expect(response).toBe(getBoardDetailResult);
      // 컨트롤러에서 서비스의 getBoardDetail 메서드를 사용할 때 다음과 같은 매개변수를 사용하는지 확인
      expect(mockBoardsService.getBoardDetail).toHaveBeenCalledWith(req.params.boardId);
    });
  });

  describe('updateBoard', () => {
    it('should update board', async () => {
      //GIVEN
      const updateBoardResult = {
        status: 201,
        message: '보드 수정에 성공했습니다.',
      };
      const req = { params: { boardId: 1 } };

      //WHEN
      // 모킹된 서비스의 updateBoard 메서드를 실행하면 updateBoardResult 값을 반환한다는 의미
      mockBoardsService.updateBoard.mockResolvedValue(updateBoardResult);

      //THEN
      const response = await controller.updateBoard(req.params.boardId, updateBoardDto);
      // 컨트롤러의 실제 updateBoard 메서드의 결과가 updateBoardResult 같은지 확인
      expect(response).toBe(updateBoardResult);
      // 컨트롤러에서 서비스의 updateBoard 메서드를 사용할 때 다음과 같은 매개변수를 사용하는지 확인
      expect(mockBoardsService.updateBoard).toHaveBeenCalledWith(
        req.params.boardId,
        updateBoardDto
      );
    });
  });

  describe('deleteBoard', () => {
    it('should delete board', async () => {
      //GIVEN
      const deleteBoardResult = {
        status: 201,
        message: '보드 삭제에 성공했습니다.',
      };
      const req = { params: { boardId: 1 } };

      //WHEN
      // 모킹된 서비스의 deleteBoard 메서드를 실행하면 deleteBoardResult 값을 반환한다는 의미
      mockBoardsService.deleteBoard.mockResolvedValue(deleteBoardResult);

      //THEN
      const response = await controller.deleteBoard(req.params.boardId);
      // 컨트롤러의 실제 deleteBoard 메서드의 결과가 deleteBoardResult 같은지 확인
      expect(response).toBe(deleteBoardResult);
      // 컨트롤러에서 서비스의 deleteBoard 메서드를 사용할 때 다음과 같은 매개변수를 사용하는지 확인
      expect(mockBoardsService.deleteBoard).toHaveBeenCalledWith(req.params.boardId);
    });
  });

  describe('createInvitation', () => {
    it('should create invitation', async () => {
      //GIVEN
      const createInvitationResult = {
        email: 'test@test.com',
        token: 'ask6dj2fnl12iud3rn',
      };

      //WHEN
      // 모킹된 서비스의 createInvitation 메서드를 실행하면 createInvitationResult 값을 반환한다는 의미
      mockBoardsService.createInvitation.mockResolvedValue(createInvitationResult);

      //THEN
      const response = await controller.createInvitation(createInvitationDto);
      // 컨트롤러의 실제 createInvitation 메서드의 결과에 token이 있는지 확인
      expect(response).toHaveProperty('token');
      // 컨트롤러의 실제 createInvitation 메서드의 token이 문자열인지 확인
      expect(typeof response.token).toBe('string');
      // 컨트롤러의 실제 createInvitation 메서드의 결과가 createInvitationResult 같은지 확인
      expect(response).toBe(createInvitationResult);
      // 컨트롤러에서 서비스의 createInvitation 메서드를 사용할 때 다음과 같은 매개변수를 사용하는지 확인
      expect(mockBoardsService.createInvitation).toHaveBeenCalledWith(createInvitationDto);
    });
  });

  describe('acceptInvitation', () => {
    it('should accept invitation', async () => {
      //GIVEN
      const acceptInvitationResult = {
        status: 201,
        message: '성공적으로 보드에 가입되었습니다.',
      };

      //WHEN
      // 모킹된 서비스의 acceptInvitation 메서드를 실행하면 acceptInvitationResult 값을 반환한다는 의미
      mockBoardsService.acceptInvitation.mockResolvedValue(acceptInvitationResult);

      //THEN
      const response = await controller.acceptInvitation(acceptInvitationDto);
      // acceptInvitation 메서드가 오류 없이 1번만 반환되었는지 확인
      expect(response).toHaveReturnedTimes(1);
      // 컨트롤러의 실제 acceptInvitation 메서드의 결과가 acceptInvitationResult 같은지 확인
      expect(response).toBe(acceptInvitationResult);
      // 컨트롤러에서 서비스의 acceptInvitation 메서드를 사용할 때 다음과 같은 매개변수를 사용하는지 확인
      expect(mockBoardsService.acceptInvitation).toHaveBeenCalledWith(acceptInvitationDto);
    });
  });
});
